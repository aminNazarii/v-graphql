import Vue from 'vue';
import axios from 'axios';

export default {
  resources: {},
  prefix: '/graphql',
  schema: '',
  axios,

  /**
   *
   * @param Vue
   * @param options
   */
  install(Vue, options) {
    Vue.prototype.$graphql = this;
  },

  /**
   *
   * @param resources
   */
  setResources(resources) {
    this.recources = resources;
  },

  /**
   *
   * @param prefix
   */
  setPrefix(prefix) {
    this.prefix = prefix;
  },

  /**
   *
   * @param name
   * @param config
   * @returns {AxiosPromise<any>}
   */
  query(name = null, config = {query: null, variables: null, schema: ""}) {
    let resource = config.query;
    if (!config.query) {
      resource = this.recources.query[name];
    }

    let schema = this.schema;
    if (config.schema) {
      schema = '/' + config.schema;
    }

    return this.axios.post(
      this.prefix + schema,
      {
        query: resource.replace(/\n|\t/g, ' '),
        variables: config.variables
      });
  },

  /**
   *
   * @param name
   * @param config
   * @returns {AxiosPromise<any>}
   */
  mutation(name = null, config = {query: null, variables: null, schema: ""}) {
    let resource = config.query;
    if (!config.query) {
      resource = this.recources.mutation[name];
    }

    let schema = '';
    if (config.schema) {
      schema = '/' + config.schema;
    }

    return this.axios.post(
      this.prefix + schema,
      {
        query: resource.replace(/\s+/g, ' '),
        variables: config.variables
      });
  },
}
