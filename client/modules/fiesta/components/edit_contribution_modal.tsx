import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import { Modal, Message, Menu, MenuItem, Icon, Segment, Dimmer, Loader, Button, Checkbox, Label, Header } from 'semantic-ui-react';
import { versions, models } from '../../../../lib/configs/magic/data_models';
import { useContributionSummaryQuery } from '../hooks/use_contribution_summary_query';
import { useContributionTableQuery } from '../hooks/use_contribution_table_query';
import { useContributionQuery } from '../hooks/use_contribution_query';

const model = models[versions.slice(-1)[0]];
const orderedTableNames = _.sortBy(_.keys(model.tables), table => model.tables[table].position);

export const EditContributionModal = ({ contributionID, trigger, initialTable }: {
  contributionID: number,
  trigger: ReactElement,
  initialTable?: string,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmptyColumns, setShowEmptyColumns] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [activeTable, setTable] = useState(initialTable || orderedTableNames[0]);
  const summaryQuery = useContributionSummaryQuery(contributionID, { enabled: isOpen });
  const activeTableQuery = useContributionTableQuery(contributionID, activeTable, { enabled: isOpen });
  const contributionQuery = useContributionQuery(contributionID, { enabled: isOpen && activeTableQuery.isSuccess });

  const isPrivate = summaryQuery?.data?.summary?.contribution?._is_activated !== 'true';
  const contentHeight = `calc(100vh - ${isPrivate ? 19 : 14}rem)`;
  
  const hotTable = useRef(null);
  useEffect(() => {
    const hot = hotTable.current?.hotInstance;
    hot && hot.render()
  }, [activeTableQuery?.dataUpdatedAt, hotTable.current]);
  return (
    <Modal
      trigger={trigger}
      onOpen={() => { setIsOpen(true);  setTable(initialTable || orderedTableNames[0]); }}
      onClose={() => setIsOpen(false)}
      open={isOpen}
      style={{ width: 'calc(100vw - 4em)' }}
    >
      <Modal.Header>
        <i 
          className="close icon" 
          onClick={() => setIsOpen(false)}
          style={{ cursor:'pointer', float: 'right' }}
        />
        {contributionID} - Contribution Data
      </Modal.Header>
      <Modal.Content>
        <Menu attached='top' tabular size='small' style={{ overflow: 'hidden' }}>
          {
            orderedTableNames.map((tableName, i) =>
              <MenuItem key={i} active={activeTable === tableName}
              style={activeTable === tableName ? { backgroundColor: '#F0F0F0' } : {}}
                onClick={() => setTable(tableName)}
              >
                {model.tables[tableName].label}
              </MenuItem>
            )
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
          <HotTable
            key={contributionID + activeTable}
            ref={hotTable}
            className={!isPrivate ? 'handsontable-readonly' : ''}
            style={{ height: contentHeight, overflow: 'hidden', backgroundColor: '#EEE' }}
            settings={{
              licenseKey: "non-commercial-and-evaluation",
              data: activeTableQuery.data.rows,
              contextMenu: isPrivate,
              minSpareRows: !isPrivate || activeTable === 'contribution' ? 0 : 100,

              rowHeaders: true,
              colHeaders: activeTableQuery.data.orderedColumnNames.map(column => {
                return column + (activeTableQuery.data.columnCV[column] ? ' (cv)' : '')
              }),
              hiddenColumns: {
                columns: showEmptyColumns || activeTableQuery.data.rows.length == 0 ? [] : activeTableQuery.data.emptyColumnsIdxs
              },
              outsideClickDeselects: false,
              comments: true,
              beforeOnCellMouseDown: (event, cell) => {
                if (!isPrivate || hotTable?.current?.hotInstance.getCellMeta(cell.row, cell.col).readOnly) {
                  // hotTable?.current?.hotInstance.deselectCell();
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  setSelectedColumn(null);
                } else {
                  setSelectedColumn(cell.col);
                }
              }
            }}
          >
            {activeTableQuery.data.orderedColumnNames.map((column, i) => 
              <HotColumn key={i} data={column} readOnly={!isPrivate || activeTableQuery.data.isColumnReadOnly[column]}>
              </HotColumn>
            )}
          </HotTable>
          || null
        }
        </div>
        <div style={{
          width: '250px', padding: '1rem', border: '1px solid #D4D4D5', borderTop: 'none', backgroundColor: '#F9F9F9', overflowY: 'scroll'
        }}>
          <Header sub>
            Tables
          </Header>
          <Menu vertical fluid>
          {orderedTableNames.map((tableName, i) =>
            <MenuItem key={i} active={activeTable === tableName}
              onClick={() => setTable(tableName)}
            >
              {model.tables[tableName].label}
              <Label circular basic size="small" style={{ minWidth: '4em', color: 'rgba(0, 0, 0, 0.87)' }}>
                {contributionQuery.isSuccess ? contributionQuery.data[tableName]?.length || 0 : '?'}
              </Label>
            </MenuItem>
            )}
          </Menu>
          <Header sub>
            Selected Cell
          </Header>
            {selectedColumn || 'None Selected'}
          <Header sub>
            Options
          </Header>
          <Checkbox toggle label="Show Empty Columns" checked={showEmptyColumns || activeTableQuery?.data?.rows?.length == 0} onChange={(_, data) => {
            setShowEmptyColumns(data.checked || false);
          }} />
        </div>
      </div>
      </Modal.Content>
      { isPrivate && 
        <Modal.Actions>
          <Button color='purple' floated="left" onClick={() => {

          }}>
            Save Edits
          </Button>
          <Button color='red' onClick={() => {

          }}>
            Cancel Edits
          </Button>
          <Button onClick={() => {
          }}>
            Close
          </Button>
        </Modal.Actions>
      }
    </Modal>
  );
}