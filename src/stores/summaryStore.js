import { writable } from 'svelte/store';
import scopeStore from './scopeStore';

export const initialSummaryStore = {
  EVALUATION_TITLE: '',
  EVALUATION_COMMISSIONER: '',
  EVALUATION_CREATOR: '',
  EVALUATION_DATE: new Date().toDateString(),
  EVALUATION_SUMMARY: '',
  EVALUATION_SPECIFICS: ''
};

const summaryStore = writable({...initialSummaryStore});
//summaryStore.subscribe((value) => console.log(value));

export default summaryStore;
