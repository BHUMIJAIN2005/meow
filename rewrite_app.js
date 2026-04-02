const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const newHeader = `/**
 * Logic Lens - Interactive Animator Engine
 * This engine parses an execution trace and updates the UI synchronously.
 */

const ALGORITHMS = {
  'reverse': {
    rawCode: [
      { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>reverse_string</span>(s, idx):" },
      { line: 2, badge: "o1", text: "    <span class='syn-kw'>if</span> idx == <span class='syn-fn'>len</span>(s):" },
      { line: 3, badge: "o1", text: "        <span class='syn-kw'>return</span> <span class='syn-kw'>\\\"\\\"</span>" },
      { line: 4, badge: "on", text: "    sub = <span class='syn-fn'>reverse_string</span>(s, idx + 1)" },
      { line: 5, badge: "on", text: "    <span class='syn-kw'>return</span> sub + s[idx]" }
    ],
    targetArray: ["d", "o", "g"],
    trace: [
      {
        step: 0, lineNum: 1, expl: "Start reverse_string('dog', 0)", why: "Initial call",
        spaceExpl: "Memory allocated for string 'dog'", spaceWhy: "Strings require contiguous O(n) heap space.",
        pointers: { i: 0, j: null }, arrayState: "normal",
        frames: ["rev('dog', 0)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'o1', optimal: 'o1', explain: 'Input space isn\\'t counted in auxilary space. Stack is depth 1.' }
      },
      {
        step: 1, lineNum: 2, expl: "Is 0 == 3? No.", why: "Base case check",
        spaceExpl: "Check base case condition", spaceWhy: "Integer comparisons operate in O(1) constant space.",
        pointers: { i: 0, j: null }, arrayState: "normal",
        frames: ["rev('dog', 0)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'o1', optimal: 'o1', explain: 'Still constant auxiliary space.' }
      },
      {
        step: 2, lineNum: 4, expl: "Make recursive call for idx 1", why: "Process next character",
        spaceExpl: "Push rev('dog', 1) to Call Stack", spaceWhy: "Each recursive call consumes an O(1) memory frame.",
        pointers: { i: 0, j: null }, arrayState: "highlight-i",
        frames: ["rev('dog', 0)", "rev('dog', 1)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'o1', optimal: 'o1', explain: 'Second frame added. Still effectively O(1)... for now.' }
      },
      {
        step: 3, lineNum: 2, expl: "Is 1 == 3? No.", why: "Base case check",
        spaceExpl: "Check base case for idx 1", spaceWhy: "No new memory allocated for conditions.",
        pointers: { i: 1, j: null }, arrayState: "normal",
        frames: ["rev('dog', 0)", "rev('dog', 1)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'o1', optimal: 'o1', explain: 'Checking condition in frame 2.' }
      },
      {
        step: 4, lineNum: 4, expl: "Make recursive call for idx 2", why: "Process next character",
        spaceExpl: "Push rev('dog', 2) to Call Stack", spaceWhy: "Stack depth increases, consuming more O(1) frames.",
        pointers: { i: 1, j: null }, arrayState: "highlight-i",
        frames: ["rev('dog', 0)", "rev('dog', 1)", "rev('dog', 2)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Stack depth visibly scaling with string size n. Space complexity becomes O(n).' }
      },
      {
        step: 5, lineNum: 2, expl: "Is 2 == 3? No.", why: "Base case check",
        spaceExpl: "Check base case for idx 2", spaceWhy: "No new memory allocated for conditions.",
        pointers: { i: 2, j: null }, arrayState: "normal",
        frames: ["rev('dog', 0)", "rev('dog', 1)", "rev('dog', 2)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Stack continues growing...' }
      },
      {
        step: 6, lineNum: 4, expl: "Make recursive call for idx 3", why: "Process next character",
        spaceExpl: "Push rev('dog', 3) to Call Stack", spaceWhy: "Maximum recursion depth reached. Peak stack space is O(n).",
        pointers: { i: 2, j: null }, arrayState: "highlight-i",
        frames: ["rev('dog', 0)", "rev('dog', 1)", "rev('dog', 2)", "rev('dog', 3)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Max depth n=3 reached. Call stack requires O(n) auxiliary space!' }
      },
      {
        step: 7, lineNum: 2, expl: "Is 3 == 3? YES.", why: "Base case reached!",
        spaceExpl: "Base case reached", spaceWhy: "Returning constant '' requires O(1) space.",
        pointers: { i: null, j: null }, arrayState: "success",
        frames: ["rev('dog', 0)", "rev('dog', 1)", "rev('dog', 2)", "rev('dog', 3)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }, { id: 'ret', type: 'constant', label: "''", elements: 1, peak: 1, peakLabel: 'O(1)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Max depth n=3 reached. Call stack requires O(n) auxiliary space!' }
      },
      {
        step: 8, lineNum: 3, expl: "Return empty string ''", why: "End of string reached.",
        spaceExpl: "Pop rev('dog', 3) from stack", spaceWhy: "Stack frame memory is freed upon return.",
        pointers: { i: null, j: null }, arrayState: "success",
        frames: ["rev('dog', 0)", "rev('dog', 1)", "rev('dog', 2)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }, { id: 'ret', type: 'constant', label: "''", elements: 1, peak: 1, peakLabel: 'O(1)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Frames are now popping off, peak complexity is still O(n).' }
      },
      {
        step: 9, lineNum: 5, expl: "Return '' + 'g'", why: "Appending character from stack frame.",
        spaceExpl: "Allocate new string 'g'", spaceWhy: "String concatenation creates a new string in heap memory.",
        pointers: { i: 2, j: null }, arrayState: "compare",
        frames: ["rev('dog', 0)", "rev('dog', 1)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }, { id: 'sub1', type: 'array', label: "sub: 'g'", elements: 1, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Frames are now popping off, peak complexity is still O(n).' }
      },
      {
        step: 10, lineNum: 5, expl: "Return 'g' + 'o'", why: "Appending character from stack frame.",
        spaceExpl: "Allocate new string 'go'", spaceWhy: "String concatenation creates a new string in heap memory.",
        pointers: { i: 1, j: null }, arrayState: "compare",
        frames: ["rev('dog', 0)"],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }, { id: 'sub2', type: 'array', label: "sub: 'go'", elements: 2, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Frames are now popping off, peak complexity is still O(n).' }
      },
      {
        step: 11, lineNum: 5, expl: "Return 'go' + 'd'", why: "Final concatenation. Result: 'god'.",
        spaceExpl: "Allocate new string 'god'", spaceWhy: "Final string created. Old intermediate strings will be garbage collected.",
        pointers: { i: 0, j: null }, arrayState: "success",
        frames: [],
        heap: [{ id: 's', type: 'array', label: "s: 'dog'", elements: 3, peak: 3, peakLabel: 'O(n)' }, { id: 'sub3', type: 'array', label: "sub: 'god'", elements: 3, peak: 3, peakLabel: 'O(n)' }],
        space: { live: 'on', optimal: 'o1', explain: 'Done! Final result returned.' }
      }
    ]
  },
  'binary_search': {
    rawCode: [
        { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>binary_search</span>(arr, target):" },
        { line: 2, badge: "o1", text: "    left, right = 0, <span class='syn-fn'>len</span>(arr) - 1" },
        { line: 3, badge: "o1", text: "    <span class='syn-kw'>while</span> left <= right:" },
        { line: 4, badge: "o1", text: "        mid = (left + right) // 2" },
        { line: 5, badge: "o1", text: "        <span class='syn-kw'>if</span> arr[mid] == target: <span class='syn-kw'>return</span> mid" },
        { line: 6, badge: "o1", text: "        <span class='syn-kw'>elif</span> arr[mid] < target: left = mid + 1" },
        { line: 7, badge: "o1", text: "        <span class='syn-kw'>else</span>: right = mid - 1" },
        { line: 8, badge: "o1", text: "    <span class='syn-kw'>return</span> -1" }
    ],
    targetArray: [1, 3, 5, 7, 9],
    trace: [
        {
            step: 0, lineNum: 1, expl: "Start binary_search([1,3,5,7,9], 7)", why: "Function call",
            spaceExpl: "Memory allocated for references to existing array", spaceWhy: "Input array is not copied; references take O(1) space.",
            pointers: {}, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [1,3,5,7,9]", elements: 5, peak: 5, peakLabel: 'Input' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Input space isn\\'t counted in auxiliary space. Only variables are needed.' }
        },
        {
            step: 1, lineNum: 2, expl: "Initialize left=0, right=4", why: "Setup search boundaries",
            spaceExpl: "Allocate left and right pointers", spaceWhy: "Two integer variables require constant O(1) space.",
            pointers: { l: 0, r: 4 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars1', type: 'constant', label: "L, R", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Pointers L and R are simple integer allocations. Auxiliary space stays O(1).' }
        },
        {
            step: 2, lineNum: 3, expl: "Is 0 <= 4? YES.", why: "Loop condition",
            spaceExpl: "Check condition", spaceWhy: "Comparisons use O(1) space.",
            pointers: { l: 0, r: 4 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars1', type: 'constant', label: "L, R", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'In while loop. Space remains O(1).' }
        },
        {
            step: 3, lineNum: 4, expl: "Calculate mid = (0 + 4) // 2 = 2", why: "Find middle element",
            spaceExpl: "Allocate mid pointer", spaceWhy: "One integer variable requires constant O(1) space.",
            pointers: { l: 0, r: 4, m: 2 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars2', type: 'constant', label: "L, R, M", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Allocating mid variable. Still O(1) auxiliary space.' }
        },
        {
            step: 4, lineNum: 5, expl: "Is arr[2] (5) == 7? No.", why: "Check target",
            spaceExpl: "Access arr[mid]", spaceWhy: "Array element access uses O(1) space.",
            pointers: { l: 0, r: 4, m: 2 }, arrayState: "highlight-m",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars2', type: 'constant', label: "L, R, M", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Evaluating arr[mid]. Space strictly constant.' }
        },
        {
            step: 5, lineNum: 6, expl: "Is arr[2] (5) < 7? YES. left = 2 + 1 = 3", why: "Update left boundary",
            spaceExpl: "Update left pointer", spaceWhy: "Reassigning variable uses no extra memory, stays O(1).",
            pointers: { l: 3, r: 4, m: 2 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars1', type: 'constant', label: "L, R, M", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'No new memory added. Iterative binary search stays O(1) space.' }
        },
        {
            step: 6, lineNum: 3, expl: "Is 3 <= 4? YES.", why: "Loop condition",
            spaceExpl: "Check condition", spaceWhy: "Comparisons use O(1) space.",
            pointers: { l: 3, r: 4 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars1', type: 'constant', label: "L, R", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Repeating loop... Space is flat O(1).' }
        },
        {
            step: 7, lineNum: 4, expl: "Calculate mid = (3 + 4) // 2 = 3", why: "Find middle element",
            spaceExpl: "Update mid pointer", spaceWhy: "One integer variable requires constant O(1) space.",
            pointers: { l: 3, r: 4, m: 3 }, arrayState: "normal",
            frames: ["binary_search(...)"],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'vars2', type: 'constant', label: "L, R, M", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Updating mid variable. Still O(1) space.' }
        },
        {
            step: 8, lineNum: 5, expl: "Is arr[3] (7) == 7? YES. Return 3.", why: "Target found",
            spaceExpl: "Return value", spaceWhy: "Returning constant integer uses O(1) space.",
            pointers: { l: 3, r: 4, m: 3 }, arrayState: "success",
            frames: [],
            heap: [{ id: 'arr', type: 'array', label: "arr: [...]", elements: 5, peak: 5, peakLabel: 'Input' }, { id: 'ret', type: 'constant', label: "3", elements: 1, peak: 1, peakLabel: 'O(1)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Algorithm completes. Maximum auxiliary space was O(1) throughout.' }
        }
    ]
  },
  'subsets': {
    rawCode: [
        { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>get_subsets</span>(nums):" },
        { line: 2, badge: "o2n", text: "    result = [[]]" },
        { line: 3, badge: "o1", text: "    <span class='syn-kw'>for</span> num <span class='syn-kw'>in</span> nums:" },
        { line: 4, badge: "o2n", text: "        new_subsets = []" },
        { line: 5, badge: "o2n", text: "        <span class='syn-kw'>for</span> curr <span class='syn-kw'>in</span> result:" },
        { line: 6, badge: "o2n", text: "            new_subsets.<span class='syn-fn'>append</span>(curr + [num])" },
        { line: 7, badge: "o2n", text: "        result.<span class='syn-fn'>extend</span>(new_subsets)" },
        { line: 8, badge: "o2n", text: "    <span class='syn-kw'>return</span> result" }
    ],
    targetArray: ["A", "B", "C"],
    trace: [
        {
            step: 0, lineNum: 1, expl: "Start get_subsets(['A', 'B', 'C'])", why: "Function call",
            spaceExpl: "Memory allocated for references to existing array", spaceWhy: "Input array.",
            pointers: {}, arrayState: "normal",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'arr', type: 'array', label: "nums: [...]", elements: 3, peak: 3, peakLabel: 'Input' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Initial stack frame.' }
        },
        {
            step: 1, lineNum: 2, expl: "Initialize result = [[]]", why: "Setup start state",
            spaceExpl: "Allocate result array with 1 empty subset", spaceWhy: "Array allocation begins. Size is 1.",
            pointers: {}, arrayState: "normal",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[1]", elements: 1, peak: 1, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Output accumulation begins linearly. (Target: return all, implies O(2ⁿ) best possible).' }
        },
        {
            step: 2, lineNum: 3, expl: "For num 'A'", why: "Iterate first element",
            spaceExpl: "Assign num='A'", spaceWhy: "Variable assignment O(1).",
            pointers: { idx: 0 }, arrayState: "highlight-i",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[1]", elements: 1, peak: 1, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'o1', optimal: 'o1', explain: 'Variable tracking, space is O(1).' }
        },
        {
            step: 3, lineNum: 6, expl: "Clone [] and add 'A'. new_subsets=[['A']]", why: "Form new combinations",
            spaceExpl: "Allocate temp list with 1 new subset", spaceWhy: "Doubling previous subsets length (1 -> 2).",
            pointers: { idx: 0 }, arrayState: "compare",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[1]", elements: 1, peak: 2, peakLabel: 'O(2ⁿ)' }, { id: 'new', type: 'array', label: "new[1]", elements: 1, peak: 2, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on', optimal: 'o1', explain: 'Subset combinations start growing O(n) relative to powers of 2.' }
        },
        {
            step: 4, lineNum: 7, expl: "Merge back: result=[[], ['A']]", why: "Accumulate subsets",
            spaceExpl: "Extend result list", spaceWhy: "Result array doubles in size.",
            pointers: { idx: 0 }, arrayState: "normal",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[2]", elements: 2, peak: 2, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on', optimal: 'o1', explain: 'Result list grows.' }
        },
        {
            step: 5, lineNum: 3, expl: "For num 'B'", why: "Iterate next element",
            spaceExpl: "Assign num='B'", spaceWhy: "Variable assignment O(1).",
            pointers: { idx: 1 }, arrayState: "highlight-i",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[2]", elements: 2, peak: 4, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on', optimal: 'o1', explain: 'Next item processed.' }
        },
        {
            step: 6, lineNum: 6, expl: "Clone existing and add 'B'. new_subsets=[['B'], ['A','B']]", why: "Form new combinations",
            spaceExpl: "Allocate temp list with 2 new subsets", spaceWhy: "Growth is multiplicative.",
            pointers: { idx: 1 }, arrayState: "compare",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[2]", elements: 2, peak: 4, peakLabel: 'O(2ⁿ)' }, { id: 'new', type: 'array', label: "new[2]", elements: 2, peak: 4, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on2', optimal: 'o1', explain: 'Output list compounding. Growth exceeds linear size.' }
        },
        {
            step: 7, lineNum: 7, expl: "Merge back: result=[[], ['A'], ['B'], ['A','B']]", why: "Accumulate subsets",
            spaceExpl: "Extend result list to 4 elements", spaceWhy: "Result array doubles again.",
            pointers: { idx: 1 }, arrayState: "normal",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[4]", elements: 4, peak: 4, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on2', optimal: 'o1', explain: 'Combined list is now 4 items large.' }
        },
        {
            step: 8, lineNum: 3, expl: "For num 'C'", why: "Iterate last element",
            spaceExpl: "Assign num='C'", spaceWhy: "Variable assignment O(1).",
            pointers: { idx: 2 }, arrayState: "highlight-i",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[4]", elements: 4, peak: 8, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'on2', optimal: 'o1', explain: 'Ready to double again.' }
        },
        {
            step: 9, lineNum: 6, expl: "Clone and add 'C' to all 4 existing subsets", why: "Form new combinations",
            spaceExpl: "Allocate temp list with 4 new subsets", spaceWhy: "Exponential compounding: 2^n elements generating.",
            pointers: { idx: 2 }, arrayState: "compare",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[4]", elements: 4, peak: 8, peakLabel: 'O(2ⁿ)' }, { id: 'new', type: 'array', label: "new[4]", elements: 4, peak: 8, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'o2n', optimal: 'o1', explain: 'Space growth explodes! The array must store 2^n subsets, requiring O(2^n) memory allocation. NOTE: We can just yield O(1) combinations optimally.' }
        },
        {
            step: 10, lineNum: 7, expl: "Merge back to create 8 total subsets", why: "Accumulate subsets",
            spaceExpl: "Result list reaches 2^3 = 8 elements", spaceWhy: "All combinations constructed.",
            pointers: { idx: 2 }, arrayState: "normal",
            frames: ["get_subsets(...)"],
            heap: [{ id: 'res', type: 'array', label: "res[8]", elements: 8, peak: 8, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'o2n', optimal: 'o1', explain: 'Maximum subset array size 2^n stabilized.' }
        },
        {
            step: 11, lineNum: 8, expl: "Return array of 8 subsets", why: "Function complete",
            spaceExpl: "Result returned to caller", spaceWhy: "Final memory footprint is 2^n.",
            pointers: { idx: null }, arrayState: "success",
            frames: [],
            heap: [{ id: 'res', type: 'array', label: "res[8]", elements: 8, peak: 8, peakLabel: 'O(2ⁿ)' }],
            space: { live: 'o2n', optimal: 'o1', explain: 'Algorithm completes. Peak auxiliary memory was O(2^n) storing combinations.' }
        }
    ]
  }
};
`;

code = code.replace(/const RAW_CODE = ([\s\S]*?)\];\s*const TARGET_ARRAY = \[.*?\];\s*const EXECUTION_TRACE = \[([\s\S]*?)\];/g, newHeader);

// Update AnimatorEngine constructor
code = code.replace(/class AnimatorEngine\s*{\s*constructor\(\)\s*{/, `class AnimatorEngine {\n  constructor(algoKey = 'reverse') {\n    const algo = ALGORITHMS[algoKey];\n    this.algoKey = algoKey;\n    this.rawCode = algo.rawCode;\n    this.targetArray = algo.targetArray;\n    this.executionTrace = algo.trace;`);
code = code.replace(/this\.totalSteps = EXECUTION_TRACE\.length;/, `this.totalSteps = this.executionTrace.length;`);
code = code.replace(/RAW_CODE\.forEach/g, `this.rawCode.forEach`);
code = code.replace(/EXECUTION_TRACE\.forEach/g, `this.executionTrace.forEach`);
code = code.replace(/EXECUTION_TRACE\.slice/g, `this.executionTrace.slice`);
code = code.replace(/EXECUTION_TRACE\.findIndex/g, `this.executionTrace.findIndex`);
code = code.replace(/EXECUTION_TRACE\[/g, `this.executionTrace[`);
code = code.replace(/TARGET_ARRAY\.length/g, `this.targetArray.length`);

code = code.replace(/const targetStep = this.executionTrace.findIndex\(t => t.lineNum === codeLine.line\);/, `const targetStep = this.executionTrace.findIndex(t => t.lineNum === codeLine.line);`);

// Replace buildCanvas
code = code.replace(/buildCanvas\(\) \{[\s\S]*?bindEvents\(\)/, `buildCanvas() {
    this.canvas.innerHTML = ''; // Built in updateCanvasVisuals
  }

  bindEvents()`);

// Replace updateCanvasVisuals
const newUpdateCanvasVisuals = `updateCanvasVisuals(state) {
    const canvas = document.getElementById('tab-execution');

    if (this.algoKey === 'reverse') {
      if (!document.getElementById('exec-video-container')) {
        canvas.innerHTML = \`
           <div id="exec-video-container" style="display:flex; flex-direction:column; align-items:center; gap: 2rem; width:100%;">
              <div style="font-family:var(--font-mono); color:var(--text-muted);">def reverse_string(s, idx):</div>
              <div id="string-nodes" style="display:flex; gap:10px; padding:2rem; background:rgba(0,0,0,0.5); border-radius:12px; box-shadow:inset 0 0 20px rgba(0,0,0,0.8);">
                  \${this.targetArray.map((char, i) => \\\`<div class="array-node" id="char-\${i}">\${char}<div class="pointer" id="ptr-idx-\${i}">idx</div></div>\\\`).join('')}
              </div>
              <div id="build-area" style="min-height: 80px; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size: 2rem; color:var(--accent-green); letter-spacing:8px; border-bottom:2px solid rgba(255,255,255,0.1); width:200px;"></div>
           </div>
        \`;
      }
      
      document.querySelectorAll('.array-node').forEach(el => el.className = 'array-node');
      document.querySelectorAll('.pointer').forEach(el => el.classList.remove('visible'));

      const { i } = state.pointers;
      if (i !== null && i >= 0 && i < this.targetArray.length) {
        const ptr = document.getElementById(\`ptr-idx-\${i}\`);
        if (ptr) ptr.classList.add('visible');

        const node = document.getElementById(\`char-\${i}\`);
        if (node) {
          if (state.arrayState === 'highlight-i') node.classList.add('highlight-read');
          if (state.arrayState === 'compare') node.classList.add('highlight-compare');
          if (state.arrayState === 'success') node.classList.add('highlight-success');
        }
      }
      
      const buildArea = document.getElementById('build-area');
      if (state.step >= 8) {
        if (state.step === 8) buildArea.textContent = "";
        if (state.step === 9) buildArea.textContent = "g";
        if (state.step === 10) buildArea.textContent = "go";
        if (state.step === 11) buildArea.textContent = "god";
        buildArea.style.transform = "scale(1.1)";
        setTimeout(() => buildArea.style.transform = "scale(1)", 200);
      } else {
        buildArea.textContent = "";
      }
    } else if (this.algoKey === 'binary_search') {
      if (!document.getElementById('exec-video-container-bs')) {
        canvas.innerHTML = \`
           <div id="exec-video-container-bs" style="display:flex; flex-direction:column; align-items:center; gap: 2rem; width:100%;">
              <div style="font-family:var(--font-mono); color:var(--text-muted);">def binary_search(arr, target):</div>
              <div id="string-nodes" style="display:flex; gap:10px; padding:2rem; background:rgba(0,0,0,0.5); border-radius:12px; box-shadow:inset 0 0 20px rgba(0,0,0,0.8);">
                  \${this.targetArray.map((num, i) => \\\`<div class="array-node" id="num-\${i}">\${num}<div class="pointer" id="ptr-\${i}" style="width: 100%; text-align: center; left: 0; transform: none; bottom: -25px; white-space: pre-wrap;"></div></div>\\\`).join('')}
              </div>
           </div>
        \`;
      }
      
      document.querySelectorAll('.array-node').forEach(el => el.className = 'array-node');
      document.querySelectorAll('.pointer').forEach(el => {
          el.classList.remove('visible');
          el.textContent = '';
      });

      const { l, r, m } = state.pointers;
      if (l !== undefined && l !== null) {
          const p = document.getElementById(\`ptr-\${l}\`);
          if (p) { p.classList.add('visible'); p.textContent += 'L '; }
          const n = document.getElementById(\`num-\${l}\`);
          if (n) n.classList.add('highlight-read');
      }
      if (r !== undefined && r !== null) {
          const p = document.getElementById(\`ptr-\${r}\`);
          if (p) { p.classList.add('visible'); p.textContent += 'R '; }
          const n = document.getElementById(\`num-\${r}\`);
          if (n) n.classList.add('highlight-read');
      }
      if (m !== undefined && m !== null) {
          const p = document.getElementById(\`ptr-\${m}\`);
          if (p) { p.classList.add('visible'); p.textContent += 'M '; }
          const n = document.getElementById(\`num-\${m}\`);
          if (n) n.classList.add('highlight-compare');
      }
      
      if (state.arrayState === 'success') {
          if (m !== undefined && m !== null) {
             const n = document.getElementById(\`num-\${m}\`);
             if(n) {
                n.className = 'array-node highlight-success';
             }
          }
      }
    } else if (this.algoKey === 'subsets') {
      if (!document.getElementById('exec-video-container-sub')) {
        canvas.innerHTML = \`
           <div id="exec-video-container-sub" style="display:flex; flex-direction:column; align-items:center; gap: 2rem; width:100%;">
              <div style="font-family:var(--font-mono); color:var(--text-muted);">def get_subsets(nums):</div>
              <div id="string-nodes" style="display:flex; gap:10px; padding:2rem; background:rgba(0,0,0,0.5); border-radius:12px; box-shadow:inset 0 0 20px rgba(0,0,0,0.8);">
                  \${this.targetArray.map((val, i) => \\\`<div class="array-node" id="sub-\${i}">\${val}<div class="pointer" id="ptr-\${i}">num</div></div>\\\`).join('')}
              </div>
           </div>
        \`;
      }
      document.querySelectorAll('.array-node').forEach(el => el.className = 'array-node');
      document.querySelectorAll('.pointer').forEach(el => el.classList.remove('visible'));

      const { idx } = state.pointers;
      if (idx !== undefined && idx !== null && idx >= 0 && idx < this.targetArray.length) {
          const p = document.getElementById(\`ptr-\${idx}\`);
          if (p) p.classList.add('visible');
          const n = document.getElementById(\`sub-\${idx}\`);
          if (n) n.classList.add('highlight-read');
      }
    }
  }`;

code = code.replace(/updateCanvasVisuals\(state\) \{[\s\S]*?(?=\n\}\n\n\/\/ Start sequence)/, newUpdateCanvasVisuals);

// Update init engine launch to use selector
code = code.replace(/window\.currentEngine = new AnimatorEngine\(\);/, `const algoKey = document.getElementById('algorithm-select') ? document.getElementById('algorithm-select').value : 'reverse';
      window.currentEngine = new AnimatorEngine(algoKey);`);

fs.writeFileSync('app.js', code);
console.log("Rewritten app.js successfully");