export default data => ((data && data._embedded && data._embedded['http://v2.wp-api.org/attachment']) || []);
