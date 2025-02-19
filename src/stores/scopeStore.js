import { writable } from 'svelte/store';

export const initialScopeStore = {
  ADDITIONAL_REQUIREMENTS: '',
  AS_BASELINE: '',
  CONFORMANCE_TARGET: 'AA',
  SITE_NAME: '',
  WCAG_VERSION: '2.1',
  WEBSITE_SCOPE: ''
};

const scopeStore = writable({...initialScopeStore});
//scopeStore.subscribe((value) => console.log(value));

export default scopeStore;
