import elasticsearch from 'elasticsearch';

export const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: process.env.ELASTICSEARCH_URL
});