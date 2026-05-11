import React, { ReactElement, useState, useRef, useEffect, useMemo } from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import { Modal, Message, Menu, MenuItem, Icon, Segment, Dimmer, Loader, Button, Checkbox, Label, Header, List, Accordion } from 'semantic-ui-react';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { Meteor } from 'meteor/meteor';
import { versions, models } from '../../../../lib/configs/magic/data_models';
import { cvs } from '../../../../lib/modules/er/controlled_vocabularies';
import { methodCodes } from '../../../../lib/configs/magic/method_codes';
import { index } from '../../../../lib/configs/magic/search_levels';
import { useContributionSummaryQuery } from '../hooks/use_contribution_summary_query';
import { useContributionTableQuery } from '../hooks/use_contribution_table_query';
import { useContributionQuery } from '../hooks/use_contribution_query';
import ValidateContribution from '../../../../lib/modules/magic/validate_contribution';

const model = models[versions.slice(-1)[0]];
const orderedTableNames = _.sortBy(_.keys(model.tables), table => model.tables[table].position);

export const EditContributionModal = ({ contributionID, trigger, initialTable }: {
  contributionID: number,
  trigger: ReactElement,
  initialTable?: string,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmptyColumns, setShowEmptyColumns] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number, columnName: string, absoluteRow: number} | null>(null);
  const [cellUpdateTrigger, setCellUpdateTrigger] = useState(0);
  const [activeAccordions, setActiveAccordions] = useState<number[]>([]);
  const [activeTable, setTable] = useState(initialTable || orderedTableNames[0]);
  const [hasEdits, setHasEdits] = useState(false);
  const [editedTables, setEditedTables] = useState<Set<string>>(new Set());
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});
  const [editedTableData, setEditedTableData] = useState<Record<string, any[]>>({});
  const [editedCells, setEditedCells] = useState<Record<string, Set<string>>>({}); // tableName -> Set of "row,col"
  const editedCellsRef = useRef<Record<string, Set<string>>>({});
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
  const [rowsPerPage, setRowsPerPage] = useState(250);
  const [isSaving, setIsSaving] = useState(false);
  const [isResummarizing, setIsResummarizing] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<null | 'pending'>(null);
  // Full validation.errors: table -> column -> message -> row(1-based) -> true
  const [validationData, setValidationData] = useState<Record<string, any>>({});
  const validationDataRef = useRef<Record<string, any>>({});
  const [validationTrigger, setValidationTrigger] = useState(0);
  const summaryQuery = useContributionSummaryQuery(contributionID, { enabled: isOpen });
  const activeTableQuery = useContributionTableQuery(contributionID, activeTable, { enabled: isOpen });
  const contributionQuery = useContributionQuery(contributionID, { enabled: isOpen && !!contributionID });

  const isPrivate = summaryQuery?.data?.summary?.contribution?._is_activated !== 'true';
  const contentHeight = `calc(100vh - ${isPrivate ? 19 : 14}rem)`;

  // Per-table stable placeholder for empty tables. Keyed by table name to prevent
  // cross-table contamination when the user switches between empty tables.
  const emptyTableData = useRef<Record<string, any[]>>({});
  const getEmptyTableData = (tableName: string) => {
    if (!emptyTableData.current[tableName]) emptyTableData.current[tableName] = [{}];
    return emptyTableData.current[tableName];
  };

  // Compute the data source for HotTable. Dependencies intentionally exclude `editedTableData`
  // so that in-flight edits never trigger a Handsontable data-reload (which would wipe the edit).
  // When the active table changes we re-evaluate and restore any previously saved edits.
  const hotTableData = useMemo(() => {
    if (!activeTableQuery?.data) return getEmptyTableData(activeTable);
    if (editedTableData[activeTable]?.length > 0) return editedTableData[activeTable];
    if (activeTableQuery.data.rows.length === 0 && isPrivate && activeTable !== 'contribution')
      return getEmptyTableData(activeTable);
    const rows = activeTableQuery.data.rows;
    if (!isPrivate || rows.length === 0) return rows;
    // Populate contribution_id and row_id if any rows are missing them
    const needsPopulating = rows.some((row: any) => !row.contribution_id || !row.row_id);
    if (!needsPopulating) return rows;
    let rowCounter = 1;
    for (const tableName of orderedTableNames) {
      if (tableName === activeTable) break;
      rowCounter += contributionQuery.data?.[tableName]?.length || 0;
    }
    return rows.map((row: any, i: number) => ({
      ...row,
      ...(row.contribution_id ? {} : { contribution_id: String(contributionID) }),
      ...(row.row_id ? {} : { row_id: String(rowCounter + i) }),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable, activeTableQuery?.dataUpdatedAt, contributionQuery?.dataUpdatedAt, isPrivate]);

  // Paging: compute from latest data (including edits) for accurate counts
  const page = currentPage[activeTable] || 0;
  const fullRowCount = editedTableData[activeTable]?.length > 0
    ? editedTableData[activeTable].length
    : hotTableData.length;
  const needsPaging = fullRowCount > rowsPerPage;
  const totalPages = needsPaging ? Math.ceil(fullRowCount / rowsPerPage) : 1;
  const validPage = Math.min(page, Math.max(totalPages - 1, 0));
  const pageOffset = validPage * rowsPerPage;
  const isLastPage = validPage >= totalPages - 1;

  // Sliced data for HotTable when paging. Deps exclude editedTableData so edits
  // don't cause HotTable data reloads. On page navigation the memo re-evaluates
  // and picks up the latest editedTableData from the closure.
  const pagedData = useMemo(() => {
    const base = editedTableData[activeTable]?.length > 0 ? editedTableData[activeTable] : hotTableData;
    if (base.length <= rowsPerPage) return hotTableData;
    const maxPage = Math.max(Math.ceil(base.length / rowsPerPage) - 1, 0);
    const safePage = Math.min(page, maxPage);
    const offset = safePage * rowsPerPage;
    return base.slice(offset, offset + rowsPerPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable, page, rowsPerPage, activeTableQuery?.dataUpdatedAt, contributionQuery?.dataUpdatedAt, isPrivate]);

  const hotTable = useRef(null);
  const editedTableDataRef = useRef<Record<string, any[]>>({});
  useEffect(() => {
    const hot = hotTable.current?.hotInstance;
    hot && hot.render()
  }, [activeTableQuery?.dataUpdatedAt, hotTable.current]);

  // Default "Show Empty Columns" to on for empty tables, off for non-empty when switching tables
  const showEmptyColumnsDefaultedFor = useRef('');
  useEffect(() => {
    if (!activeTableQuery?.data) return;
    if (showEmptyColumnsDefaultedFor.current !== activeTable) {
      setShowEmptyColumns(activeTableQuery.data.rows.length === 0);
      showEmptyColumnsDefaultedFor.current = activeTable;
    }
  }, [activeTable, activeTableQuery?.dataUpdatedAt]);

  const runClientValidation = (contribution: any) => {
    const validator = new ValidateContribution({ runnerState: {} } as any);
    validator.validatePromise(contribution).then(() => {
      const errors = validator.validation?.errors || {};
      setValidationData(errors);
      validationDataRef.current = errors;
      setPendingStatus(null);
      const h = hotTable.current?.hotInstance;
      if (h) {
        // Reload with the latest committed data (includes read-only contribution_id / row_id)
        const latest = editedTableDataRef.current;
        const base = latest[activeTable]?.length > 0 ? latest[activeTable] : hotTableData;
        const data = base.length <= rowsPerPage ? base : base.slice(pageOffset, pageOffset + rowsPerPage);
        setTimeout(() => { h.loadData(data); h.render(); }, 0);
      }
    });
  };

  // Run validation whenever the modal opens or after a save
  useEffect(() => {
    if (!isOpen || !contributionID) return;
    setValidationData({});
    validationDataRef.current = {};
    Meteor.callAsync('esValidatePrivateContribution', {
      index,
      id: contributionID,
      contributor: summaryQuery.data?.summary?.contribution?.contributor
    }).then((validation: any) => {
      const errors = validation?.errors || {};
      setValidationData(errors);
      validationDataRef.current = errors;
      const hot = hotTable.current?.hotInstance;
      if (hot) setTimeout(() => hot.render(), 0);
    }).catch(() => { /* silently ignore */ });
  }, [isOpen, contributionID, validationTrigger]);
  return (
    <Modal
      trigger={React.cloneElement(trigger, { onClick: () => { setIsOpen(true); setTable(initialTable || orderedTableNames[0]); } })}
      onClose={() => setIsOpen(false)}
      open={isOpen}
      style={{ width: 'calc(100vw - 4em)' }}
    >
      <Modal.Header>
        <i 
          className="close icon" 
          onClick={() => setIsOpen(false)}
          style={{ cursor:'pointer', float: 'right', marginRight: '-0.5em' }}
        />
        {contributionID} - Contribution Data
      </Modal.Header>
      <Modal.Content>
        <Menu attached='top' tabular style={{ overflow: 'hidden' }}>
          {
            orderedTableNames.map((tableName, i) => {
              const tableHasEdits = editedTables.has(tableName);
              const rowCount = tableHasEdits && tableCounts[tableName] !== undefined
                ? tableCounts[tableName]
                : (contributionQuery.isSuccess ? contributionQuery.data[tableName]?.length || 0 : '?');
              const errorRowCount = (() => {
                const tableErrors = validationData[tableName];
                if (!tableErrors) return 0;
                const seen = new Set<string>();
                Object.values(tableErrors).forEach((colMsgs: any) => {
                  Object.values(colMsgs).forEach((rowSet: any) => {
                    Object.keys(rowSet).forEach(r => seen.add(r));
                  });
                });
                return seen.size;
              })();
              const editedRowCount = (() => {
                const cellSet = editedCells[tableName];
                if (!cellSet || cellSet.size === 0) return 0;
                const rows = new Set<string>();
                cellSet.forEach(key => rows.add(key.slice(0, key.indexOf(','))));
                return rows.size;
              })();
              const showCounts = errorRowCount > 0 || editedRowCount > 0;
              return (
                <MenuItem key={i} active={activeTable === tableName}
                  style={activeTable === tableName ? { backgroundColor: '#F0F0F0' } : {}}
                  onClick={() => setTable(tableName)}
                >
                  {model.tables[tableName].label}
                  {showCounts ? (
                    <span style={{ marginLeft: '0.5em', display: 'inline-flex', alignItems: 'center', gap: '0.25em' }}>
                      {errorRowCount > 0 && (
                        <Label circular size="small" style={{ backgroundColor: '#9f3a38', color: 'white', borderColor: '#9f3a38' }}>
                          {errorRowCount}
                        </Label>
                      )}
                      {editedRowCount > 0 && (
                        <Label circular size="small" style={{ backgroundColor: '#800080', color: 'white', borderColor: '#800080' }}>
                          {editedRowCount}
                        </Label>
                      )}
                      <span style={{ fontSize: '0.75em', color: '#666' }}>of</span>
                      <Label circular basic size="small" style={{ color: 'rgba(0,0,0,0.87)' }}>
                        {rowCount}
                      </Label>
                    </span>
                  ) : (
                    <Label circular basic size="small" style={{ marginLeft: '0.5em', color: 'rgba(0,0,0,0.87)' }}>
                      {rowCount}
                    </Label>
                  )}
                </MenuItem>
              );
            })
          }
        </Menu>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, minWidth: 0, border: '1px solid #D4D4D5', borderTop: 'none', borderRight: 'none' }}>
        {(activeTableQuery.isLoading) &&
          <Segment basic style={{ overflow: 'auto', height: contentHeight }}>
            <Dimmer active inverted>
              <Loader inverted>Loading {model.tables[activeTable].label} Table Data</Loader>
            </Dimmer>
          </Segment>
          ||
          activeTableQuery.isError &&
          <Message error basic size="large" style={{ overflow: 'auto', height: contentHeight, textAlign: 'center', alignContent: 'center' }}>
            <Icon name="warning sign" />
            Error Loading {model.tables[activeTable].label} Table Data
          </Message>
          ||
          activeTableQuery?.data &&
          <>
          <style>{`
            .htCore td.readonly-cell {
              background-color: #f8f8f8 !important;
            }
            .htCore td.readonly-cell.area {
              background-color: #f4f4f4 !important;
            }
            .ui.menu .item .ui.circular.label {
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              padding: 0 0.4em !important;
              line-height: 1 !important;
            }
            .htCore td.edited-cell {
              box-shadow: inset 0 0 0 2px #ce93d8 !important;
            }
            .htCore td.edited-cell.area {
              box-shadow: inset 0 0 0 2px #ab47bc !important;
            }
            .htCore td.error-cell {
              background-color: #fde8e8 !important;
            }
            .htCore td.error-cell.area {
              background-color: #f9d0d0 !important;
            }
          `}</style>
          <HotTable
            key={contributionID + activeTable + (needsPaging ? '-p' + validPage : '')}
            ref={hotTable}
            className={!isPrivate ? 'handsontable-readonly' : ''}
            style={{ height: contentHeight, overflow: 'hidden', backgroundColor: '#EEE' }}
            settings={{
              licenseKey: "non-commercial-and-evaluation",
              data: pagedData,
              contextMenu: isPrivate,
              minSpareRows: !isPrivate || activeTable === 'contribution' ? 0
                : (needsPaging && !isLastPage ? 0 : 100),

              rowHeaders: needsPaging
                ? (idx: number) => String(pageOffset + idx + 1)
                : true,
              colHeaders: activeTableQuery.data.orderedColumnNames.map(column => {
                return column + (activeTableQuery.data.columnCV[column] ? ' (cv)' : '')
              }),
              hiddenColumns: {
                columns: showEmptyColumns
                  ? []
                  : activeTableQuery.data.rows.length === 0
                    ? activeTableQuery.data.orderedColumnNames
                        .map((colName: string, idx: number) => ({ colName, idx }))
                        .filter(({ colName }: { colName: string }) =>
                          !activeTableQuery.data.isColumnReadOnly[colName] &&
                          !model.tables[activeTable].columns[colName]?.validations?.includes('required()'))
                        .map(({ idx }: { idx: number }) => idx)
                    : activeTableQuery.data.emptyColumnsIdxs.filter((idx: number) => {
                        const colName = activeTableQuery.data.orderedColumnNames[idx];
                        return !activeTableQuery.data.isColumnReadOnly[colName] &&
                               !model.tables[activeTable].columns[colName]?.validations?.includes('required()');
                      })
              },
              outsideClickDeselects: false,
              comments: activeTableQuery.data.rows.length > 0 || editedTableData[activeTable]?.length > 0,
              cells: (row, col) => {
                const absoluteRow = row + pageOffset;
                const columnName = activeTableQuery.data.orderedColumnNames[col];
                const isReadOnly = !isPrivate || activeTableQuery.data.isColumnReadOnly[columnName];
                const isEdited = editedCellsRef.current[activeTable]?.has(`${absoluteRow},${columnName}`);
                const colErrors = validationDataRef.current[activeTable]?.[columnName];
                const hasError = colErrors
                  ? Object.values(colErrors).some((rowSet: any) => rowSet[absoluteRow + 1] === true)
                  : false;
                const classNames = [];
                if (isReadOnly) classNames.push('readonly-cell');
                if (isEdited) classNames.push('edited-cell');
                if (hasError) classNames.push('error-cell');
                return {
                  className: classNames.join(' ')
                };
              },
              afterChange: (changes, source) => {
                if (source !== 'loadData' && changes) {
                  const normalize = (v: any) => (v === null || v === undefined) ? '' : String(v);
                  const actualChanges = changes.filter(([, , oldVal, newVal]) => normalize(oldVal) !== normalize(newVal));
                  if (actualChanges.length === 0) return;
                  setPendingStatus('pending');
                  // Update ref synchronously so hot.render() sees the new cells immediately
                  const updatedSet = editedCellsRef.current[activeTable]
                    ? new Set(editedCellsRef.current[activeTable])
                    : new Set<string>();
                  actualChanges.forEach(([row, prop, , newVal]) => {
                    const key = `${row + pageOffset},${prop}`;
                    const originalVal = activeTableQuery.data?.rows[row + pageOffset]?.[prop as string];
                    if (normalize(newVal) !== normalize(originalVal)) {
                      updatedSet.add(key);
                    } else {
                      updatedSet.delete(key);
                    }
                  });
                  editedCellsRef.current = { ...editedCellsRef.current, [activeTable]: updatedSet };
                  setEditedCells(editedCellsRef.current);
                  const tableHasAnyEdits = Object.values(editedCellsRef.current).some(s => s.size > 0);
                  setHasEdits(tableHasAnyEdits);
                  if (updatedSet.size > 0) {
                    setEditedTables(prev => new Set(prev).add(activeTable));
                  } else {
                    setEditedTables(prev => { const next = new Set(prev); next.delete(activeTable); return next; });
                  }
                  const hot = hotTable.current?.hotInstance;
                  // Force re-render to apply edited-cell styling
                  if (hot) {
                    setTimeout(() => hot.render(), 0);
                  }
                  if (hot && activeTableQuery.data) {
                    // Use source data objects directly so column keys are preserved and
                    // spare rows added by minSpareRows are identified by empty objects.
                    const pageSourceData: any[] = hot.getSourceData();
                    const isRowEmpty = (row: any) =>
                      !row || !Object.values(row).some((v: any) => v !== null && v !== undefined && v !== '');
                    const nonBlankPageRows = pageSourceData.filter((row: any) => !isRowEmpty(row));

                    // Remove empty rows between the first and last non-empty row so
                    // validation highlighting maps to the correct row indices.
                    let lastNonEmptyIdx = -1;
                    for (let i = pageSourceData.length - 1; i >= 0; i--) {
                      if (!isRowEmpty(pageSourceData[i])) { lastNonEmptyIdx = i; break; }
                    }
                    if (lastNonEmptyIdx > 0) {
                      const hasGaps = pageSourceData.slice(0, lastNonEmptyIdx).some(isRowEmpty);
                      if (hasGaps) {
                        const compacted = pageSourceData.filter((row: any, idx: number) =>
                          idx >= lastNonEmptyIdx || !isRowEmpty(row)
                        );
                        // Build old-to-new visual-row index mapping for compacted rows
                        const oldToNewIdx = new Map<number, number>();
                        let newIdx = 0;
                        pageSourceData.forEach((row: any, idx: number) => {
                          if (idx >= lastNonEmptyIdx || !isRowEmpty(row)) oldToNewIdx.set(idx, newIdx++);
                        });
                        // Remap edited-cell markers so the outline follows the moved row
                        const currentSet = editedCellsRef.current[activeTable];
                        if (currentSet) {
                          const remappedSet = new Set<string>();
                          currentSet.forEach(key => {
                            const commaIdx = key.indexOf(',');
                            const absRow = parseInt(key.slice(0, commaIdx), 10);
                            const col = key.slice(commaIdx + 1);
                            const relRow = absRow - pageOffset;
                            if (relRow >= 0 && relRow < pageSourceData.length && oldToNewIdx.has(relRow)) {
                              remappedSet.add(`${oldToNewIdx.get(relRow)! + pageOffset},${col}`);
                            } else {
                              remappedSet.add(key);
                            }
                          });
                          editedCellsRef.current = { ...editedCellsRef.current, [activeTable]: remappedSet };
                          setEditedCells(editedCellsRef.current);
                        }
                        // Mutate the per-table placeholder in-place so that React re-render
                        // reloads (via updateSettings → loadData) also use the compacted layout
                        // instead of re-introducing the gap.
                        const placeholder = getEmptyTableData(activeTable);
                        placeholder.length = 0;
                        compacted.forEach((row: any) => placeholder.push(row));
                        setTimeout(() => {
                          const h = (hotTable.current as any)?.hotInstance;
                          if (h) h.loadData(placeholder);
                        }, 0);
                      }
                    }

                    // Strip empty-valued keys from each row before storing
                    const cleanRows = nonBlankPageRows.map((row: any) => {
                      const editedRow: any = {};
                      Object.entries(row).forEach(([key, val]: [string, any]) => {
                        if (val !== null && val !== undefined && val !== '') editedRow[key] = val;
                      });
                      return editedRow;
                    });
                    let validationSnapshot: Record<string, any> | null = null;
                    setEditedTableData(prev => {
                      // Merge page data back into the full table data
                      const base = prev[activeTable]?.length > 0 ? prev[activeTable] : hotTableData;
                      const before = base.slice(0, pageOffset);
                      const after = !isLastPage ? base.slice(pageOffset + rowsPerPage) : [];
                      const pageRows = cleanRows.map((row: any) =>
                        row.contribution_id ? row : { ...row, contribution_id: String(contributionID) }
                      );
                      const current = [...before, ...pageRows, ...after];
                      setTableCounts(prevCounts => ({ ...prevCounts, [activeTable]: current.length }));
                      const next: Record<string, any[]> = { ...prev, [activeTable]: current };

                      // Recalculate row_id sequentially across all tables in position order
                      let rowCounter = 1;
                      orderedTableNames.forEach(tableName => {
                        if (next[tableName]) {
                          next[tableName] = next[tableName].map((row: any, i: number) => ({
                            ...row,
                            row_id: String(rowCounter + i)
                          }));
                          rowCounter += next[tableName].length;
                        } else {
                          rowCounter += contributionQuery.data?.[tableName]?.length || 0;
                        }
                      });

                      editedTableDataRef.current = next;
                      if (contributionQuery.data) {
                        validationSnapshot = { ...contributionQuery.data, ...next };
                      }
                      return next;
                    });
                    if (validationSnapshot) {
                      setTimeout(() => runClientValidation(validationSnapshot!), 0);
                    } else {
                      setTimeout(() => setPendingStatus(null), 0);
                    }
                  }
                }
              },
              afterRemoveRow: (_index, _amount, _physicalRows, source) => {
                if (source === 'loadData') return;
                const hot = hotTable.current?.hotInstance;
                if (!hot) return;
                setHasEdits(true);
                setEditedTables(prev => new Set(prev).add(activeTable));
                setPendingStatus('pending');
                const pageSourceData: any[] = hot.getSourceData();
                const nonBlankPageRows = pageSourceData.filter((row: any) =>
                  row && Object.values(row).some((v: any) => v !== null && v !== undefined && v !== '')
                );
                const cleanRows = nonBlankPageRows.map((row: any) => {
                  const editedRow: any = {};
                  Object.entries(row).forEach(([key, val]: [string, any]) => {
                    if (val !== null && val !== undefined && val !== '') editedRow[key] = val;
                  });
                  return editedRow;
                });
                let validationSnapshotRemove: Record<string, any> | null = null;
                setEditedTableData(prev => {
                  const base = prev[activeTable]?.length > 0 ? prev[activeTable] : hotTableData;
                  const before = base.slice(0, pageOffset);
                  const after = !isLastPage ? base.slice(pageOffset + rowsPerPage) : [];
                  const pageRows = cleanRows.map((row: any) =>
                    row.contribution_id ? row : { ...row, contribution_id: String(contributionID) }
                  );
                  const current = [...before, ...pageRows, ...after];
                  setTableCounts(prevCounts => ({ ...prevCounts, [activeTable]: current.length }));
                  const next: Record<string, any[]> = { ...prev, [activeTable]: current };
                  let rowCounter = 1;
                  orderedTableNames.forEach(tableName => {
                    if (next[tableName]) {
                      next[tableName] = next[tableName].map((row: any, i: number) => ({
                        ...row,
                        row_id: String(rowCounter + i)
                      }));
                      rowCounter += next[tableName].length;
                    } else {
                      rowCounter += contributionQuery.data?.[tableName]?.length || 0;
                    }
                  });
                  editedTableDataRef.current = next;
                  if (contributionQuery.data) {
                    validationSnapshotRemove = { ...contributionQuery.data, ...next };
                  }
                  return next;
                });
                if (validationSnapshotRemove) {
                  setTimeout(() => runClientValidation(validationSnapshotRemove!), 0);
                } else {
                  setTimeout(() => setPendingStatus(null), 0);
                }
              },
              beforeOnCellMouseDown: (event, cell) => {
                // Row header click: select entire row, update selected cell to first editable col
                if (cell.col === -1) {
                  const orderedCols = activeTableQuery.data.orderedColumnNames;
                  const firstEditableIdx = orderedCols.findIndex(
                    (col: string) => isPrivate && !activeTableQuery.data.isColumnReadOnly[col]
                  );
                  const colIdx = firstEditableIdx >= 0 ? firstEditableIdx : 0;
                  setSelectedCell({ row: cell.row, col: colIdx, columnName: orderedCols[colIdx], absoluteRow: cell.row + pageOffset });
                  if (!isPrivate) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                  return;
                }
                const columnName = activeTableQuery.data.orderedColumnNames[cell.col];
                if (!isPrivate || hotTable?.current?.hotInstance.getCellMeta(cell.row, cell.col).readOnly) {
                  // hotTable?.current?.hotInstance.deselectCell();
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  setSelectedCell({ row: cell.row, col: cell.col, columnName, absoluteRow: cell.row + pageOffset });
                } else {
                  setSelectedCell({ row: cell.row, col: cell.col, columnName, absoluteRow: cell.row + pageOffset });
                }
              }
            }}
          >
            {activeTableQuery.data.orderedColumnNames.map((column, i) => 
              <HotColumn key={i} data={column} readOnly={!isPrivate || activeTableQuery.data.isColumnReadOnly[column]}>
              </HotColumn>
            )}
          </HotTable>
          </>
          || null
        }
        </div>
        <div style={{
          width: '350px', padding: '1rem', border: '1px solid #D4D4D5', borderTop: 'none', backgroundColor: '#F9F9F9', overflowY: 'auto', maxHeight: contentHeight
        }}>
          {pendingStatus === 'pending' && (
            <>
              <Message info size="small" style={{ marginBottom: '0.5em' }}>
                <Icon name="circle notch" loading />
                Applying Read-Only Values...
              </Message>
              <Message info size="small" style={{ marginBottom: '1em' }}>
                <Icon name="circle notch" loading />
                Checking Validation Errors...
              </Message>
            </>
          )}
          <Header sub>
            Selected Cell
          </Header>
          {selectedCell && activeTableQuery?.data ? (() => {
            const columnDef = model.tables[activeTable].columns[selectedCell.columnName];
            const cvKey = activeTableQuery.data.columnCV[selectedCell.columnName];
            const cellValue = activeTableQuery.data.rows[selectedCell.absoluteRow]?.[selectedCell.columnName];
            const isColumnReadOnly = activeTableQuery.data.isColumnReadOnly[selectedCell.columnName];
            
            return (
              <Segment basic style={{ padding: 0, margin: 0 }}>
                <div style={{ marginBottom: '1em' }}>
                  <strong>Column:</strong> {selectedCell.columnName}
                </div>
                {(() => {
                  const tableErrors = validationData[activeTable];
                  const isTableLevel = activeTableQuery.data.rows.length === 0 &&
                    tableErrors && Object.keys(tableErrors).length > 0;
                  let errorMessages: string[] = [];
                  if (isTableLevel) {
                    // Collect all unique messages across all columns for this table
                    const seen = new Set<string>();
                    Object.values(tableErrors).forEach((colMsgs: any) => {
                      Object.keys(colMsgs).forEach(msg => { seen.add(msg); });
                    });
                    errorMessages = Array.from(seen);
                  } else {
                    const colErrors = tableErrors?.[selectedCell.columnName];
                    errorMessages = colErrors
                      ? Object.entries(colErrors)
                          .filter(([, rows]: [string, any]) => rows[selectedCell.absoluteRow + 1] === true)
                          .map(([msg]) => msg)
                      : [];
                  }
                  return errorMessages.length > 0 ? (
                    <Message error size="small" style={{ marginBottom: '1em' }}>
                      <Message.Header style={{ fontSize: '0.9em' }}>Validation Errors</Message.Header>
                      <Message.List>
                        {errorMessages.map((msg, i) => (
                          <Message.Item key={i} style={{ fontSize: '0.85em' }}>{msg}</Message.Item>
                        ))}
                      </Message.List>
                    </Message>
                  ) : null;
                })()}
                {columnDef && (
                  <>
                    {columnDef.label && (
                      <div style={{ marginBottom: '0.5em' }}>
                        <strong>Label:</strong> {columnDef.label}
                      </div>
                    )}
                    {columnDef.type && (
                      <div style={{ marginBottom: '0.5em' }}>
                        <strong>Type:</strong> {columnDef.type}
                      </div>
                    )}
                    {columnDef.unit && (
                      <div style={{ marginBottom: '0.5em' }}>
                        <strong>Unit:</strong> {columnDef.unit}
                      </div>
                    )}
                    {columnDef.description && (
                      <div style={{ marginBottom: '0.5em' }}>
                        <strong>Description:</strong> {columnDef.description}
                      </div>
                    )}
                    {columnDef.notes && (
                      <div style={{ marginBottom: '0.5em', fontSize: '0.9em', fontStyle: 'italic' }}>
                        <strong>Notes:</strong> {columnDef.notes}
                      </div>
                    )}
                    {columnDef.examples && columnDef.examples.length > 0 && (
                      <div style={{ marginBottom: '0.5em' }}>
                        <strong>Examples:</strong>
                        <List bulleted style={{ margin: '0.25em 0 0 1em' }}>
                          {columnDef.examples.slice(0, 3).map((example, i) => (
                            <List.Item key={i} style={{ fontSize: '0.85em' }}>{example}</List.Item>
                          ))}
                        </List>
                      </div>
                    )}
                  </>
                )}
                {cvKey && cvKey === 'method_codes' ? (
                  <div style={{ marginTop: '1em' }}>
                    <Header sub>Method Codes</Header>
                    {(() => {
                      const currentValues = cellValue ? String(cellValue).split(':').map(v => v.trim()).filter(v => v) : [];
                      
                      return currentValues.length > 0 ? (
                        <Segment style={{ padding: '1em', marginBottom: '1em' }}>
                          <Header size="tiny" style={{ marginTop: 0 }}>Selected ({currentValues.length})</Header>
                          <List divided relaxed style={{ fontSize: '0.85em' }}>
                            {currentValues.map((code, idx) => {
                              // Find the code definition
                              let codeDefinition = '';
                              Object.values(methodCodes).forEach((category: any) => {
                                const found = category.codes.find((c: any) => c.code === code);
                                if (found) codeDefinition = found.definition || '';
                              });
                              
                              return (
                                <List.Item key={idx}>
                                  <Checkbox
                                    checked={true}
                                    disabled={!isPrivate || isColumnReadOnly}
                                    onChange={() => {
                                      const hot = hotTable.current?.hotInstance;
                                      if (!hot) return;
                                      
                                      const newValues = currentValues.filter(v => v !== code);
                                      const newValue = newValues.join(':');
                                      hot.setDataAtCell(selectedCell.row, selectedCell.col, newValue || '');
                                      if (activeTableQuery.data.rows[selectedCell.absoluteRow]) {
                                        activeTableQuery.data.rows[selectedCell.absoluteRow][selectedCell.columnName] = newValue || '';
                                        setCellUpdateTrigger(prev => prev + 1);
                                      }
                                    }}
                                    label={
                                      <label>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                                          {code}
                                        </div>
                                        {codeDefinition && (
                                          <div style={{ fontSize: '0.85em', color: '#666' }}>
                                            {codeDefinition}
                                          </div>
                                        )}
                                      </label>
                                    }
                                  />
                                </List.Item>
                              );
                            })}
                          </List>
                        </Segment>
                      ) : null;
                    })()}
                    <Accordion styled fluid>
                      {Object.keys(methodCodes).map((category, catIdx) => {
                        const currentValues = cellValue ? String(cellValue).split(':').map(v => v.trim()) : [];
                        const selectedCount = methodCodes[category].codes.filter(code => currentValues.includes(code.code)).length;
                        const isActive = activeAccordions.includes(catIdx);
                        
                        return (
                          <div key={catIdx}>
                            <Accordion.Title
                              active={isActive}
                              index={catIdx}
                              onClick={() => {
                                setActiveAccordions(prev => 
                                  prev.includes(catIdx) 
                                    ? prev.filter(i => i !== catIdx)
                                    : [...prev, catIdx]
                                );
                              }}
                            >
                              <Icon name='dropdown' />
                              {category.replace(/_/g, ' ').toUpperCase()}
                              {selectedCount > 0 && (
                                <Label size="small" circular style={{ marginLeft: '0.5em' }}>
                                  {selectedCount}
                                </Label>
                              )}
                            </Accordion.Title>
                            <Accordion.Content active={isActive}>
                              <List divided relaxed style={{ fontSize: '0.85em', maxHeight: '200px', overflowY: 'auto' }}>
                                {methodCodes[category].codes.map((code, codeIdx) => {
                                  const isChecked = currentValues.includes(code.code);
                                  
                                  return (
                                    <List.Item key={codeIdx}>
                                      <Checkbox 
                                        checked={isChecked}
                                        disabled={!isPrivate || isColumnReadOnly}
                                        onChange={(e, data) => {
                                          const hot = hotTable.current?.hotInstance;
                                          if (!hot) return;
                                          
                                          let newValues = [...currentValues];
                                          if (data.checked) {
                                            if (!newValues.includes(code.code)) {
                                              newValues.push(code.code);
                                            }
                                          } else {
                                            newValues = newValues.filter(v => v !== code.code);
                                          }
                                          
                                          const newValue = newValues.filter(v => v).join(':');
                                          hot.setDataAtCell(selectedCell.row, selectedCell.col, newValue || '');
                                          // Update the query data to keep checkboxes in sync
                                          if (activeTableQuery.data.rows[selectedCell.absoluteRow]) {
                                            activeTableQuery.data.rows[selectedCell.absoluteRow][selectedCell.columnName] = newValue || '';
                                            setCellUpdateTrigger(prev => prev + 1);
                                          }
                                        }}
                                        label={(
                                          <label>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                                              {code.code}
                                            </div>
                                            {code.definition && (
                                              <div style={{ fontSize: '0.85em', color: '#666' }}>
                                                {code.definition}
                                              </div>
                                            )}
                                          </label>
                                        )}
                                      />
                                    </List.Item>
                                  );
                                })}
                              </List>
                            </Accordion.Content>
                          </div>
                        );
                      })}
                    </Accordion>
                  </div>
                ) : cvKey && cvs[cvKey] ? (
                  <div style={{ marginTop: '1em' }}>
                    <Header sub>
                      {cvs[cvKey].label || cvKey}
                    </Header>
                    {(() => {
                      const currentValues = cellValue ? String(cellValue).split(':').map(v => v.trim()).filter(v => v) : [];
                      
                      return currentValues.length > 0 ? (
                        <Segment style={{ padding: '1em', marginBottom: '1em' }}>
                          <Header size="tiny" style={{ marginTop: 0 }}>Selected ({currentValues.length})</Header>
                          <List divided relaxed style={{ fontSize: '0.85em' }}>
                            {currentValues.map((itemValue, idx) => {
                              // Find the item details from CV
                              const cvItem = cvs[cvKey].items?.find((i: any) => i.item === itemValue);
                              
                              return (
                                <List.Item key={idx}>
                                  <Checkbox
                                    checked={true}
                                    disabled={!isPrivate || isColumnReadOnly}
                                    onChange={() => {
                                      const hot = hotTable.current?.hotInstance;
                                      if (!hot) return;
                                      
                                      const newValues = currentValues.filter(v => v !== itemValue);
                                      const newValue = newValues.join(':');
                                      hot.setDataAtCell(selectedCell.row, selectedCell.col, newValue || '');
                                      if (activeTableQuery.data.rows[selectedCell.absoluteRow]) {
                                        activeTableQuery.data.rows[selectedCell.absoluteRow][selectedCell.columnName] = newValue || '';
                                        setCellUpdateTrigger(prev => prev + 1);
                                      }
                                    }}
                                    label={
                                      <label>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                                          {itemValue}
                                        </div>
                                        {cvItem?.label && (
                                          <div style={{ fontSize: '0.85em', color: '#666' }}>
                                            {cvItem.label}
                                          </div>
                                        )}
                                        {cvItem?.definition && (
                                          <div style={{ fontSize: '0.85em', fontStyle: 'italic', color: '#666' }}>
                                            {cvItem.definition}
                                          </div>
                                        )}
                                      </label>
                                    }
                                  />
                                </List.Item>
                              );
                            })}
                          </List>
                        </Segment>
                      ) : null;
                    })()}
                    <Segment style={{ padding: '1em', maxHeight: '300px', overflowY: 'auto' }}>
                      <List divided relaxed style={{ fontSize: '0.85em' }}>
                        {cvs[cvKey].items?.map((item, i) => {
                          const currentValues = cellValue ? String(cellValue).split(':').map(v => v.trim()) : [];
                          const isChecked = currentValues.includes(item.item);
                          
                          return (
                            <List.Item key={i}>
                              <Checkbox 
                                checked={isChecked}
                                disabled={!isPrivate || isColumnReadOnly}
                                onChange={(e, data) => {
                                  const hot = hotTable.current?.hotInstance;
                                  if (!hot) return;
                                  
                                  let newValues = [...currentValues];
                                  if (data.checked) {
                                    if (!newValues.includes(item.item)) {
                                      newValues.push(item.item);
                                    }
                                  } else {
                                    newValues = newValues.filter(v => v !== item.item);
                                  }
                                  
                                  const newValue = newValues.filter(v => v).join(':');
                                  hot.setDataAtCell(selectedCell.row, selectedCell.col, newValue || '');
                                  // Update the query data to keep checkboxes in sync
                                  if (activeTableQuery.data.rows[selectedCell.absoluteRow]) {
                                    activeTableQuery.data.rows[selectedCell.absoluteRow][selectedCell.columnName] = newValue || '';
                                    setCellUpdateTrigger(prev => prev + 1);
                                }
                              }}
                              label={
                                <label>
                                  <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>
                                    {item.item}
                                  </div>
                                  {item.label && (
                                    <div style={{ fontSize: '0.85em', color: '#666' }}>
                                      {item.label}
                                    </div>
                                  )}
                                  {item.definition && (
                                    <div style={{ fontSize: '0.85em', fontStyle: 'italic', color: '#666' }}>
                                      {item.definition}
                                    </div>
                                  )}
                                </label>
                              }
                            />
                          </List.Item>
                        );
                      })}
                    </List>
                    </Segment>
                  </div>
                ) : null}
              </Segment>
            );
          })() : (
            <>
              {(() => {
                const tableErrors = validationData[activeTable];
                const isTableLevel = activeTableQuery?.data?.rows?.length === 0 &&
                  tableErrors && Object.keys(tableErrors).length > 0;
                if (!isTableLevel) return null;
                const seen = new Set<string>();
                Object.values(tableErrors).forEach((colMsgs: any) => {
                  Object.keys(colMsgs).forEach(msg => { seen.add(msg); });
                });
                const msgs = Array.from(seen);
                return (
                  <Message error size="small" style={{ marginBottom: '1em' }}>
                    <Message.Header style={{ fontSize: '0.9em' }}>Validation Errors</Message.Header>
                    <Message.List>
                      {msgs.map((msg, i) => (
                        <Message.Item key={i} style={{ fontSize: '0.85em' }}>{msg}</Message.Item>
                      ))}
                    </Message.List>
                  </Message>
                );
              })()}
              <div style={{ color: '#999', fontStyle: 'italic' }}>Click on a cell to see details</div>
            </>
          )}
          
          <Header sub style={{ marginTop: '1.5em' }}>
            Options
          </Header>
          <Checkbox toggle label="Show Empty Columns" checked={showEmptyColumns} onChange={(_, data) => {
            setShowEmptyColumns(data.checked || false);
          }} />
        </div>
      </div>
      </Modal.Content>
      { isPrivate && 
        <Modal.Actions style={{ position: 'relative' }}>
          <Button color='purple' floated="left" disabled={!hasEdits || isSaving || isResummarizing} onClick={async () => {
            if (!hasEdits || !contributionQuery.data) return;
            
            setIsSaving(true);
            const contributor = summaryQuery.data?.summary?.contribution?.contributor;
            const _contributor = summaryQuery.data?.summary?.contribution?._contributor;
            const id = contributionID;
            const summary = summaryQuery.data?.summary;
            
            try {
              // Start with all existing contribution data
              const contribution: any = { ...contributionQuery.data };
              
              // Update only the edited tables with cached data (strip any blank rows)
              for (const tableName of Array.from(editedTables)) {
                if (editedTableData[tableName]) {
                  contribution[tableName] = editedTableData[tableName].filter(
                    (row: any) => row && Object.values(row).some((v: any) => v !== null && v !== undefined && v !== '')
                  );
                }
              }

              // Strip downloadOnly columns (contribution_id, row_id, etc.) from all rows —
              // these are server-managed fields that must not be sent back to the server.
              orderedTableNames.forEach(tableName => {
                if (!contribution[tableName]) return;
                const downloadOnlyCols = Object.keys(model.tables[tableName]?.columns || {})
                  .filter(col => model.tables[tableName].columns[col].validations?.includes('downloadOnly()'));
                if (downloadOnlyCols.length === 0) return;
                contribution[tableName] = contribution[tableName].map((row: any) => {
                  const cleanRow = { ...row };
                  downloadOnlyCols.forEach(col => delete cleanRow[col]);
                  return cleanRow;
                });
              });
              
              // Phase 1: Save to OpenSearch
              await Meteor.callAsync('esUpdatePrivateContribution', {
                index, contributor, _contributor, id, contribution, summary
              });

              // Reset edit state and refetch data
              setHasEdits(false);
              setEditedTables(new Set());
              setTableCounts({});
              setEditedTableData({});
              setEditedCells({});
              editedCellsRef.current = {};
              setCurrentPage({});
              setValidationData({});
              validationDataRef.current = {};
              await Promise.all([
                contributionQuery.refetch(),
                activeTableQuery.refetch(),
                summaryQuery.refetch()
              ]);

            } catch (error) {
              console.error('Error saving contribution:', error);
              alert('Error saving contribution: ' + (error as Error).message);
              return;
            } finally {
              setIsSaving(false);
            }

            // Phase 2: Rebuild summaries after save is committed
            setIsResummarizing(true);
            try {
              await Meteor.callAsync('esUpdatePrivatePreSummaries', {
                index, contributor, id
              });
              await Meteor.callAsync('esUpdatePrivateSummaries', {
                index, contributor, id
              });
              // Re-run validation against the freshly summarized data
              setValidationTrigger(prev => prev + 1);
            } catch (error) {
              console.error('Error rebuilding summaries:', error);
              alert('Error rebuilding summaries: ' + (error as Error).message);
            } finally {
              setIsResummarizing(false);
            }
          }}>
            {isSaving ? 'Saving...' : isResummarizing ? 'Rebuilding Summaries...' : 'Save Edits'}
          </Button>
          {needsPaging && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <Button icon='angle left' size='small' basic disabled={validPage <= 0}
                onClick={() => { setSelectedCell(null); setCurrentPage(prev => ({ ...prev, [activeTable]: validPage - 1 })); }} />
              <span style={{ whiteSpace: 'nowrap' }}>Page {validPage + 1} of {totalPages}</span>
              <Button icon='angle right' size='small' basic disabled={isLastPage}
                onClick={() => { setSelectedCell(null); setCurrentPage(prev => ({ ...prev, [activeTable]: validPage + 1 })); }} />
              <select
                value={rowsPerPage}
                onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage({}); setSelectedCell(null); }}
                style={{ padding: '0.4em', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value={100}>100</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </select>
              <span style={{ whiteSpace: 'nowrap' }}>rows/page</span>
            </div>
          )}
          <Button color='red' disabled={!hasEdits} onClick={() => {
            // Reset all edit state
            setHasEdits(false);
            setEditedTables(new Set());
            setTableCounts({});
            setEditedTableData({});
            setEditedCells({});
            editedCellsRef.current = {};
            setCurrentPage({});
            // Refetch data to reset tables
            contributionQuery.refetch();
            activeTableQuery.refetch();
            summaryQuery.refetch();
            // Close modal
            setIsOpen(false);
          }}>
            Cancel Edits
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      }
    </Modal>
  );
}