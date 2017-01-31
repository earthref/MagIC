import elasticsearch from 'elasticsearch';

export const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: 'http://elastic:7UCqaDzNAmgRrPw7VnMVfm7JRBE6@128.193.70.68:9200' //process.env.ELASTICSEARCH_URL
});