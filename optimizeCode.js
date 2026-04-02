const OPTIMIZE_PAYLOADS = {
    dp_fibonacci: {
        id: "dp_fibonacci",
        nDefault: 10,
        reasoning: "A naive recursive sequence evaluates the (n-1) and (n-2) mathematical branches independently without awareness of parallel branches doing the same work.",
        shortcomings: "Because it computes Fib(3) multiple times while trying to solve Fib(5), the recursion tree expands exponentially. It re-solves identical subproblems repeatedly.",
        optMechanic: "Dynamic Programming (Memoization). We initialize a Hash Map or Array cache. Before exploring a recursive branch, we check if the answer for N is already in the cache.",
        optWhyFaster: "By caching answers, the massive exponential tree is pruned into a single linear branch. We only ever compute Fib(X) exactly once, immediately returning the cache on all subsequent queries.",
        optDiff: "O(2^N) collapses down to O(N). Space shifts from O(N) call stack to O(N) stack + O(N) cache.",
        brute: {
            oClass: "O(2^N) Time / O(N) Space",
            opsFn: n => Math.pow(2, n) - 1,
            spaceFn: n => n,
            color: '#fca5a5',
            code: `function fibBrute(n) {
    if (n <= 1) return n;
    // Massive redundant branching
    return fibBrute(n - 1) + fibBrute(n - 2);
}`
        },
        opt: {
            oClass: "O(N) Time / O(N) Space",
            opsFn: n => (2 * n) - 1, 
            spaceFn: n => n * 2, // Stack + Cache
            color: '#6ee7b7',
            code: `function fibOpt(n, memo = {}) {
    if (n in memo) return memo[n]; // O(1) Catch
    if (n <= 1) return n;
    
    memo[n] = fibOpt(n-1, memo) + fibOpt(n-2, memo);
    return memo[n];
}`
        }
    },
    dijkstra_path: {
        id: "dijkstra_path",
        nDefault: 20,
        reasoning: "To find the shortest path, we must continually scan all known nodes to find the one with the absolute smallest tentative distance to visit next.",
        shortcomings: "Scanning an entire array of V nodes every single step to find the minimum distance takes O(V) time per step. Doing this V times leads to an inescapable V² quadratic bound.",
        optMechanic: "Min-Heap Priority Queue. Whenever we update a node's tentative distance, we push it into an auto-sorting Binary Heap tree structure.",
        optWhyFaster: "Instead of scanning V array elements, we just pop the root of the Min-Heap in O(log V) time. The heap intrinsically maintains the minimum at the top.",
        optDiff: "O(V²) craters down to O(V + E log V). Space increases slightly from an array O(V) to Heap + Array O(V + E).",
        brute: {
            oClass: "O(V²) Time / O(V) Space",
            opsFn: n => n * n,
            spaceFn: n => n,
            color: '#fca5a5',
            code: `function dijkstraBrute(graph, start) {
    let dist = Array(V).fill(Infinity);
    dist[start] = 0;
    
    for (let i = 0; i < V; i++) {
        // O(V) Linear Scan every iteration
        let u = findMinDistanceNode(dist, visited);
        visited[u] = true;
        
        for (let v of graph[u].neighbors) {
            updateDist(u, v);
        }
    }
}`
        },
        opt: {
            oClass: "O(E log V) Time / O(V) Space",
            opsFn: n => n * Math.log2(n) + n,
            spaceFn: n => n * 1.5,
            color: '#6ee7b7',
            code: `function dijkstraOpt(graph, start) {
    let minHeap = new PriorityQueue();
    let dist = Array(V).fill(Infinity);
    
    minHeap.push({node: start, d: 0});
    
    while(minHeap.size > 0) {
        // O(log V) Instant Heap Pop Extract
        let {node: u} = minHeap.pop(); 
        
        for (let v of graph[u].neighbors) {
            if (updateDist(u, v)) minHeap.push(v);
        }
    }
}`
        }
    },
    llx_opt_bubble: {
        id: "llx_opt_bubble",
        nDefault: 30,
        reasoning: "Bubble Sort drags items strictly across adjacent bounds multiple times, resulting in massive nested iterations.",
        shortcomings: "Even if an array is almost sorted, naive implementations will scan all N items N times independently.",
        optMechanic: "Merge Sort recursively splits data in half until nodes are isolated, then physically merges them utilizing external array pointers.",
        optWhyFaster: "Halving the dataset scales logarithmically. Merging elements from bottom-up avoids redundant sweeping.",
        optDiff: "O(N²) bounds crushed to O(N log N). Space technically inflates from O(1) to O(N) auxiliary arrays.",
        brute: { oClass: "O(N²) Time", opsFn: n => n * n, spaceFn: n => 1, color: '#fca5a5', code: `for i in range(n):\n  for j in range(0, n-i-1):\n    if arr[j] > arr[j+1]: swap(j, j+1)` },
        opt: { oClass: "O(N log N) Time", opsFn: n => Math.floor(n * Math.log2(n || 1)) + 1, spaceFn: n => n, color: '#6ee7b7', code: `mid = len(arr)//2\nmergeSort(L); mergeSort(R)\nmerge(arr, L, R)` }
    },
    llx_opt_selection: {
        id: "llx_opt_selection",
        nDefault: 30,
        reasoning: "Selection Sort blindly assumes every remaining element might be the minimum.",
        shortcomings: "Scanning N numbers to find the minimum point requires N*(N-1)/2 strict operations exactly. There is no best-case escape hatch.",
        optMechanic: "Quick Sort partitions dynamic ranges. Picking a pivot element forces numbers smaller to the left and larger to the right instantly.",
        optWhyFaster: "Instead of searching for absolute minimums sequentially, Quick Sort recursively partitions relative bounds saving massive iteration overhead.",
        optDiff: "O(N²) becomes O(N log N).",
        brute: { oClass: "O(N²) Time", opsFn: n => (n * n) / 2, spaceFn: n => 1, color: '#fca5a5', code: `for i in range(n):\n  min_idx = i\n  for j in range(i+1, n):\n    if arr[j] < arr[min_idx]: min_idx = j\n  swap(i, min_idx)` },
        opt: { oClass: "O(N log N) Time", opsFn: n => Math.floor(n * Math.log2(n || 1)), spaceFn: n => Math.max(1, Math.log2(n||1)), color: '#6ee7b7', code: `pi = partition(arr, low, high)\nquickSort(arr, low, pi-1)\nquickSort(arr, pi+1, high)` }
    },
    llx_opt_insertion: {
        id: "llx_opt_insertion",
        nDefault: 30,
        reasoning: "Insertion sort pulls an element and manually slides everything prior to it one slot backward until it fits.",
        shortcomings: "Memory array shifting is computationally devastating. The worst-case requires shifting half the array backwards every single evaluation.",
        optMechanic: "Heap Sort utilizes a tree-mapped overlay (Max-Heap) over a continuous array block.",
        optWhyFaster: "Extracting the maximum node and sinking the replacement pointer costs O(log n). It natively evades O(N) array shifts.",
        optDiff: "O(N²) drops into reliable O(N log N) territory. Space complexity safely remains O(1) in-place magic.",
        brute: { oClass: "O(N²) Time / O(1) Space", opsFn: n => (n * n) / 2, spaceFn: n => 1, color: '#fca5a5', code: `key = arr[i]; j = i-1\nwhile j >= 0 and key < arr[j]:\n  arr[j+1] = arr[j] # O(N) Shift\n  j -= 1\narr[j+1] = key` },
        opt: { oClass: "O(N log N) Time / O(1)", opsFn: n => Math.floor(n * Math.log2(n || 1)), spaceFn: n => 1, color: '#6ee7b7', code: `for i in range(n//2 - 1, -1, -1):\n  heapify(arr, n, i)\nfor i in range(n-1, 0, -1):\n  swap(0, i); heapify(arr, i, 0)` }
    },
    llx_opt_counting: {
        id: "llx_opt_counting",
        nDefault: 50,
        reasoning: "Monolithic limits of Comparison Sort algorithms (like Merge Sort) natively mandate an O(N log N) floor.",
        shortcomings: "Deep recursive tree traces carry extreme stack frame allocations and logarithmic branching limits.",
        optMechanic: "Counting Sort entirely bypasses logic checks, writing direct frequency integers to memory indices.",
        optWhyFaster: "It enumerates indices mapped from raw integer values instead of traversing data sizes. It maps limits mathematically at an exact 1:1 speed ratio.",
        optDiff: "O(N log N) crashes to pure Linear O(N).",
        brute: { oClass: "O(N log N)", opsFn: n => n * Math.max(1, Math.log2(n || 1)), spaceFn: n => Math.max(1, Math.log2(n||1)), color: '#fca5a5', code: `mergeSort(L)\nmergeSort(R)\nmerge(arr, L, R)` },
        opt: { oClass: "O(N) Vector", opsFn: n => n * 2, spaceFn: n => n * 1.5, color: '#6ee7b7', code: `count = [0] * (max_val + 1)\nfor num in arr: count[num] += 1\nfor i, tally in enumerate(count):\n  for _ in range(tally): arr[idx] = i` }
    }
};

let currentOptPayload = null;
let currentN = 10;
window.optTimeChart = null;
window.optSpaceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const algSelect = document.getElementById('alg-select-optimize');
    const nSlider = document.getElementById('optimize-n-slider');
    const nVal = document.getElementById('optimize-n-val');
    
    // UI Binds
    const elReasoning = document.getElementById('opt-reasoning');
    const elShortcomings = document.getElementById('opt-shortcomings');
    const elMechanic = document.getElementById('opt-mechanic');
    const elWhyFaster = document.getElementById('opt-why-faster');
    const elDiff = document.getElementById('opt-diff');
    const elCodeBrute = document.getElementById('opt-code-brute');
    const elCodeOpt = document.getElementById('opt-code-opt');
    
    const countBrute = document.getElementById('op-counter-brute');
    const countOpt = document.getElementById('op-counter-opt');
    const gridBrute = document.getElementById('grid-brute');
    const gridOpt = document.getElementById('grid-opt');
    const bgBadgeBrute = document.getElementById('bg-badge-brute');
    const bgBadgeOpt = document.getElementById('bg-badge-opt');
    
    const speedupMult = document.getElementById('speedup-multiplier');
    const speedupNLabel = document.getElementById('speedup-n-label');

    algSelect.addEventListener('change', (e) => {
        const payload = OPTIMIZE_PAYLOADS[e.target.value];
        if (!payload) return;
        currentOptPayload = payload;
        currentN = payload.nDefault;
        nSlider.value = currentN;
        nVal.textContent = currentN;
        
        // Text Bindings
        elReasoning.textContent = payload.reasoning;
        elShortcomings.textContent = payload.shortcomings;
        elMechanic.textContent = payload.optMechanic;
        elWhyFaster.textContent = payload.optWhyFaster;
        elDiff.textContent = payload.optDiff;
        
        elCodeBrute.textContent = payload.brute.code;
        elCodeOpt.textContent = payload.opt.code;
        
        bgBadgeBrute.textContent = payload.brute.oClass;
        bgBadgeOpt.textContent = payload.opt.oClass;
        
        initCharts();
        updateRace();
    });

    nSlider.addEventListener('input', (e) => {
        currentN = parseInt(e.target.value);
        nVal.textContent = currentN;
        if(currentOptPayload) updateRace();
    });

    function initCharts() {
        const ctxTime = document.getElementById('optimize-time-chart').getContext('2d');
        const ctxSpace = document.getElementById('optimize-space-chart').getContext('2d');
        
        if (window.optTimeChart) window.optTimeChart.destroy();
        if (window.optSpaceChart) window.optSpaceChart.destroy();
        
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Input Size N' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Magnitude' } }
            },
            plugins: { legend: { labels: { color: '#f8fafc' } } },
            animation: { duration: 0 }
        };

        window.optTimeChart = new Chart(ctxTime, {
            type: 'line',
            data: {
                labels: [], datasets: [
                    { label: 'Brute Time', data: [], borderColor: '#fca5a5', borderWidth: 2, fill: true, backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                    { label: 'Opt Time', data: [], borderColor: '#6ee7b7', borderWidth: 2, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.1)' }
                ]
            },
            options: chartOptions
        });

        window.optSpaceChart = new Chart(ctxSpace, {
            type: 'line',
            data: {
                labels: [], datasets: [
                    { label: 'Brute Space', data: [], borderColor: '#fca5a5', borderWidth: 2, borderDash: [5, 5] },
                    { label: 'Opt Space', data: [], borderColor: '#6ee7b7', borderWidth: 2, borderDash: [5, 5] }
                ]
            },
            options: chartOptions
        });
    }

    function updateRace() {
        if (!currentOptPayload) return;
        const n = currentN;
        
        const opsBrute = Math.floor(currentOptPayload.brute.opsFn(n));
        const opsOpt = Math.floor(currentOptPayload.opt.opsFn(n));
        
        // Counter Match
        countBrute.textContent = opsBrute.toLocaleString();
        countOpt.textContent = opsOpt.toLocaleString();
        
        // Update Verdict Card Math Speedup
        const ratio = opsBrute / Math.max(opsOpt, 1);
        speedupNLabel.textContent = n;
        
        if (ratio > 1000) { speedupMult.textContent = (ratio/1000).toFixed(1) + 'k×'; speedupMult.style.color = '#00f0ff'; }
        else if (ratio > 100) { speedupMult.textContent = ratio.toFixed(0) + '×'; speedupMult.style.color = '#3b82f6'; }
        else if (ratio > 1) { speedupMult.textContent = ratio.toFixed(1) + '×'; speedupMult.style.color = '#6ee7b7'; }
        else { speedupMult.textContent = '1.0×'; speedupMult.style.color = 'white'; }
        
        // Chart Traces
        const tBrute = [], tOpt = [], sBrute = [], sOpt = [];
        for(let i = 1; i <= n; i++) {
            tBrute.push(currentOptPayload.brute.opsFn(i));
            tOpt.push(currentOptPayload.opt.opsFn(i));
            sBrute.push(currentOptPayload.brute.spaceFn(i));
            sOpt.push(currentOptPayload.opt.spaceFn(i));
        }
        
        const labels = Array.from({length: n}, (_, i) => i + 1);
        
        window.optTimeChart.data.labels = labels;
        window.optTimeChart.data.datasets[0].data = tBrute;
        window.optTimeChart.data.datasets[1].data = tOpt;
        window.optTimeChart.update();

        window.optSpaceChart.data.labels = labels;
        window.optSpaceChart.data.datasets[0].data = sBrute;
        window.optSpaceChart.data.datasets[1].data = sOpt;
        window.optSpaceChart.update();
        
        // Draw Dots (capped at 500 for perf)
        gridBrute.innerHTML = ''; gridOpt.innerHTML = '';
        const maxDots = 500;
        
        let bDots = '', oDots = '';
        for(let i=0; i<Math.min(opsBrute, maxDots); i++) {
            bDots += `<div style="width:10px; height:10px; background:${currentOptPayload.brute.color}; border-radius:2px; opacity: 0.8; animation: scaleIn 0.2s ${Math.random() * 0.5}s both;"></div>`;
        }
        if(opsBrute > maxDots) bDots += `<div style="color:var(--text-muted); font-size:0.8rem; margin-top:0.5rem; width:100%;">+ ${(opsBrute - maxDots).toLocaleString()} more loops</div>`;
        gridBrute.innerHTML = bDots;

        for(let i=0; i<Math.min(opsOpt, maxDots); i++) {
            oDots += `<div style="width:10px; height:10px; background:${currentOptPayload.opt.color}; border-radius:2px; opacity: 0.8; animation: scaleIn 0.2s ${Math.random() * 0.5}s both;"></div>`;
        }
        if(opsOpt > maxDots) oDots += `<div style="color:var(--text-muted); font-size:0.8rem; margin-top:0.5rem; width:100%;">+ ${(opsOpt - maxDots).toLocaleString()} more loops</div>`;
        gridOpt.innerHTML = oDots;
    }
});
