/* ──────────────────────────────────────────────────────────────
   Data index — aggregates all dev and DSA data modules.
   Import this single file to get the complete dataset.
   ────────────────────────────────────────────────────────────── */

// Dev reference data
import { htmlData } from './dev/data_html';
import { cssData } from './dev/data_css';
import { jsData } from './dev/data_js';
import { sqlData } from './dev/data_sql';
import { gitData } from './dev/data_git';

// DSA problem data
import { mathBitsData } from './dsa/dsa_math_bits';
import { arraysData } from './dsa/dsa_arrays';
import { searchingSortingData } from './dsa/dsa_searching_sorting';
import { stringsData } from './dsa/dsa_strings';
import { recursionData } from './dsa/dsa_recursion';
import { linkedListsData } from './dsa/dsa_linked_lists';
import { stacksQueuesData } from './dsa/dsa_stacks_queues';
import { greedyData } from './dsa/dsa_greedy';
import { treesData } from './dsa/dsa_trees';
import { bstData } from './dsa/dsa_bst';
import { heapsData } from './dsa/dsa_heaps';
import { hashingTriesData } from './dsa/dsa_hashing_tries';
import { graphsData } from './dsa/dsa_graphs';
import { dpData } from './dsa/dsa_dp';
import { segmentTreesData } from './dsa/dsa_segment_trees';

/** Dev reference data keyed by language id */
export const DevAtlasData = {
  html: htmlData,
  css: cssData,
  javascript: jsData,
  sql: sqlData,
  git: gitData,
};

/** DSA problem data keyed by category id */
export const DSAData = {
  'math-bits': mathBitsData,
  'arrays-matrices': arraysData,
  'searching-sorting': searchingSortingData,
  strings: stringsData,
  'recursion-backtracking': recursionData,
  'linked-lists': linkedListsData,
  'stacks-queues': stacksQueuesData,
  greedy: greedyData,
  'binary-trees': treesData,
  bst: bstData,
  heaps: heapsData,
  'hashing-tries': hashingTriesData,
  graphs: graphsData,
  'dynamic-programming': dpData,
  'segment-trees': segmentTreesData,
};
