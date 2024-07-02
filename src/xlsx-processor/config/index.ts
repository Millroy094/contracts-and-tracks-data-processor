const config = {
  trackHeaders: {
    worksheet: 'Sheet1',
    type: 'object',
    fields: [
      { row: 1, col: 1, key: 1 },
      { row: 1, col: 2, key: 2 },
      { row: 1, col: 3, key: 3 },
      { row: 1, col: 4, key: 4 },
      { row: 1, col: 5, key: 5 },
      { row: 1, col: 6, key: 6 },
      { row: 1, col: 7, key: 7 },
      { row: 1, col: 8, key: 8 },
    ],
  },
  trackRecords: {
    worksheet: 'Sheet1',
    type: 'list',
    rowOffset: 2,
    columns: [
      { index: 1, key: 'id' },
      { index: 2, key: 'title' },
      { index: 3, key: 'version' },
      { index: 4, key: 'artist' },
      {
        index: 5,
        key: 'isrc',
        mapper: (value: string) =>
          value
            ? value.replace(/[-_.\\/#|&:;'?{}[\]$%@"<>()+=^£$,\s]/g, '')
            : value,
      },
      { index: 6, key: 'p_line' },
      {
        index: 7,
        key: 'aliases',
        mapper: (value: string) => (value ? value.split(';') : value),
      },
      { index: 8, key: 'contract' },
    ],
  },
};

export default config;
