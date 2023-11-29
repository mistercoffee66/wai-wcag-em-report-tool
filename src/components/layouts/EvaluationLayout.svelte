    <!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext, onDestroy, onMount, setContext } from 'svelte';
  import { outcomeValueStore } from '@app/stores/earl/resultStore/index.js';
  import subjects, { TestSubjectTypes } from '@app/stores/earl/subjectStore/index.js';
  import wcag from '@app/stores/wcagStore.js';
  import evaluationStore from '@app/stores/evaluationStore.js';

  const { scopeStore } = getContext('app');
  // Initialize

  // Create a WebSite subject
  let websiteSubject =
    $subjects.find((subject) => {
      return subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
    }) ||
    subjects.create({
      type: TestSubjectTypes.WEBSITE
    });

  let endSubscription;
  let saveInterval;

  $: {
    websiteSubject.title = $scopeStore['SITE_NAME'];
    websiteSubject.description = $scopeStore['WEBSITE_SCOPE'];
  }

  setContext('Evaluation', {
    outcomeValues: outcomeValueStore,
    wcagCriteria: wcag
  });

  const updateEvaluation = getContext('updateEvaluation');

  onMount(() => {
    // Stores that need to be up-to-date in background
    if (saveInterval) {
        clearInterval(saveInterval);
    }
    saveInterval = setInterval(() => {
        updateEvaluation();
        $evaluationStore.saveToServer();
    }, 20 * 1000);
    endSubscription = (() => {
      const unscribeOutcomeStore = outcomeValueStore.subscribe(() => {});
      const unscribeWcag = wcag.subscribe(() => {});

      return () => {
        unscribeOutcomeStore();
        unscribeWcag();
      };
    })();
  });

  onDestroy(() => {
    endSubscription();
  });
</script>
