import _ from 'lodash';

// A contribution table is stored in one of two layouts:
//   - row objects:  [{ specimen: 'a', dir_dec: 1 }, ...]            (most tables)
//   - columnar:     { columns: ['specimen', 'dir_dec'], rows: [['a', 1], ...] }
//                   (measurements, to keep large tables compact; the validator and
//                   summarizer expect this layout, so it must be saved back that way)
// These helpers let the editor work with either layout.

export type RowObjects = Record<string, any>[];
export type ColumnarTable = { columns: string[], rows: any[][] };
export type ContributionTable = RowObjects | ColumnarTable | undefined | null;

export const isColumnarTable = (table: any): table is ColumnarTable =>
  !!table && !Array.isArray(table) && Array.isArray(table.columns) && Array.isArray(table.rows);

export const tableRowCount = (table: ContributionTable): number => {
  if (Array.isArray(table)) return table.length;
  if (isColumnarTable(table)) return table.rows.length;
  return 0;
};

// Columnar -> row objects, dropping empty cells so they look like the other tables.
export const tableToRowObjects = (table: ContributionTable): RowObjects => {
  if (Array.isArray(table)) return table;
  if (!isColumnarTable(table)) return [];
  const { columns, rows } = table;
  return rows.map(row => {
    const obj: Record<string, any> = {};
    columns.forEach((column, i) => {
      const value = row[i];
      if (value !== undefined && value !== null && value !== '') obj[column] = value;
    });
    return obj;
  });
};

// Row objects -> columnar, with columns in the order they first appear.
export const rowObjectsToColumnar = (rows: RowObjects): ColumnarTable => {
  const columns = _.uniq(_.flatMap(rows, row => _.keys(row)));
  return {
    columns,
    rows: rows.map(row => columns.map(column => row[column] ?? '')),
  };
};

// Remove columns from a table, keeping its layout.
export const omitTableColumns = <T extends ContributionTable>(table: T, omit: string[]): T => {
  if (!omit.length) return table;
  if (Array.isArray(table)) return table.map(row => _.omit(row, omit)) as T;
  if (isColumnarTable(table)) {
    const keep = table.columns.map((column, i) => (omit.includes(column) ? -1 : i)).filter(i => i >= 0);
    if (keep.length === table.columns.length) return table;
    return {
      ...table,
      columns: keep.map(i => table.columns[i]),
      rows: table.rows.map(row => keep.map(i => row[i])),
    } as T;
  }
  return table;
};
