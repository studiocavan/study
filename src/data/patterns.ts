import { PatternCategory } from '../types';

export const patternCategories: PatternCategory[] = [
  {
    id: 'two-pointer',
    romanNumeral: 'I',
    title: 'Two Pointer Patterns',
    patterns: [
      {
        id: 'converging-two-pointers',
        number: 1,
        title: 'Converging Two Pointers',
        description: 'Place one pointer at the start and one at the end of a sorted structure. Move them toward each other based on a comparison condition. Eliminates O(n²) brute-force by leveraging sorted order to make greedy pointer decisions.',
        keyInsight: 'Moving the pointer on the "weaker" side is always safe — it can only help, never hurt.',
        useCases: ['Two Sum II (sorted)', 'Container With Most Water', '3Sum', 'Valid Palindrome'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun twoSumSorted(numbers: IntArray, target: Int): IntArray {
    var left = 0
    var right = numbers.size - 1

    while (left < right) {
        val sum = numbers[left] + numbers[right]
        when {
            sum == target -> return intArrayOf(left + 1, right + 1)
            sum < target  -> left++   // need larger sum, move left right
            else          -> right--  // need smaller sum, move right left
        }
    }
    return intArrayOf()
}`,
      },
      {
        id: 'fast-slow-pointers',
        number: 2,
        title: 'Fast & Slow Pointers',
        description: 'Two pointers advance at different speeds through the structure. The fast pointer (hare) moves 2 steps per iteration; the slow pointer (tortoise) moves 1. If a cycle exists, they will eventually meet.',
        keyInsight: 'If a cycle exists, the fast pointer laps the slow pointer; if not, the fast pointer reaches null first.',
        useCases: ['Linked List Cycle', 'Find Cycle Start', 'Middle of Linked List', 'Happy Number'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun hasCycle(head: ListNode?): Boolean {
    var slow = head
    var fast = head

    while (fast?.next != null) {
        slow = slow?.next
        fast = fast.next?.next
        if (slow === fast) return true
    }
    return false
}

// Find cycle start: after meeting, reset slow to head,
// then advance both one step at a time — they meet at cycle start
fun detectCycle(head: ListNode?): ListNode? {
    var slow = head; var fast = head
    while (fast?.next != null) {
        slow = slow?.next; fast = fast.next?.next
        if (slow === fast) {
            slow = head
            while (slow !== fast) { slow = slow?.next; fast = fast?.next }
            return slow
        }
    }
    return null
}`,
      },
      {
        id: 'fixed-separation-pointers',
        number: 3,
        title: 'Fixed Separation',
        description: 'Maintain two pointers a fixed distance apart as they traverse the structure together. Commonly used on linked lists to find the Nth node from the end without knowing the list length.',
        keyInsight: 'Advance the lead pointer N steps first, then move both together — when lead reaches the end, the trailing pointer is exactly N from the end.',
        useCases: ['Remove Nth Node From End of List', 'Find K-th from Last', 'Reorder List mid-point'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
    val dummy = ListNode(0)
    dummy.next = head
    var lead: ListNode? = dummy
    var trail: ListNode? = dummy

    // Advance lead by n+1 steps
    repeat(n + 1) { lead = lead?.next }

    // Move both until lead reaches null
    while (lead != null) {
        lead = lead?.next
        trail = trail?.next
    }

    // trail is now just before the target node
    trail?.next = trail?.next?.next
    return dummy.next
}`,
      },
      {
        id: 'in-place-array-modification',
        number: 4,
        title: 'In-place Array Modification',
        description: 'Use a read pointer and a write pointer on the same array. The write pointer tracks where the next valid element should go; the read pointer scans forward. Achieves O(1) extra space for problems that normally seem to need extra memory.',
        keyInsight: 'The write pointer always stays at or behind the read pointer, so reading never overwrites unread values.',
        useCases: ['Remove Duplicates from Sorted Array', 'Move Zeroes', 'Remove Element', 'Squares of Sorted Array'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun removeDuplicates(nums: IntArray): Int {
    if (nums.isEmpty()) return 0
    var write = 1  // next position to write

    for (read in 1 until nums.size) {
        if (nums[read] != nums[read - 1]) {
            nums[write] = nums[read]
            write++
        }
    }
    return write
}

fun moveZeroes(nums: IntArray) {
    var write = 0
    for (read in nums.indices) {
        if (nums[read] != 0) {
            nums[write++] = nums[read]
        }
    }
    while (write < nums.size) nums[write++] = 0
}`,
      },
      {
        id: 'string-comparison-special-chars',
        number: 5,
        title: 'String Comparison with Special Characters',
        description: 'Two pointers scan two strings from the end (or both directions), skipping characters affected by special rules (e.g., backspace). Process both strings in lock-step rather than building intermediate strings.',
        keyInsight: 'Scanning from the end lets you apply transformations lazily — only process a character when you know its final position.',
        useCases: ['Backspace String Compare', 'Compare Strings with Wildcards', 'Clean Path'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun backspaceCompare(s: String, t: String): Boolean {
    var i = s.length - 1
    var j = t.length - 1

    fun nextValidIndex(str: String, idx: Int): Int {
        var skip = 0; var k = idx
        while (k >= 0) {
            when {
                str[k] == '#' -> { skip++; k-- }
                skip > 0      -> { skip--; k-- }
                else          -> break
            }
        }
        return k
    }

    while (i >= 0 || j >= 0) {
        i = nextValidIndex(s, i)
        j = nextValidIndex(t, j)
        if (i >= 0 && j >= 0 && s[i] != t[j]) return false
        if ((i >= 0) != (j >= 0)) return false
        i--; j--
    }
    return true
}`,
      },
      {
        id: 'expanding-from-center',
        number: 6,
        title: 'Expanding From Center',
        description: 'Start both pointers at the same position (or adjacent positions for even-length palindromes) and expand outward as long as the condition holds. Used to find all palindromic substrings or the longest palindrome centered at each position.',
        keyInsight: 'Every palindrome has a center — iterating over all O(n) centers and expanding gives O(n²) total but finds all palindromes without a DP table.',
        useCases: ['Longest Palindromic Substring', 'Palindromic Substrings (count)', 'Expanding intervals'],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun longestPalindrome(s: String): String {
    var start = 0; var maxLen = 1

    fun expand(left: Int, right: Int) {
        var l = left; var r = right
        while (l >= 0 && r < s.length && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                maxLen = r - l + 1
                start = l
            }
            l--; r++
        }
    }

    for (i in s.indices) {
        expand(i, i)       // odd-length center
        expand(i, i + 1)   // even-length center
    }
    return s.substring(start, start + maxLen)
}`,
      },
      {
        id: 'string-reversal',
        number: 7,
        title: 'String Reversal',
        description: 'Swap characters at symmetric positions using two pointers converging from both ends. Can be applied to full strings, words in a sentence (reverse each word then reverse all), or segments of an array.',
        keyInsight: 'Reversing twice restores the original; reversing sub-sections and then the whole (or vice versa) achieves rotations without extra space.',
        useCases: ['Reverse String', 'Reverse Words in String', 'Rotate Array', 'Reverse Vowels'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun reverseString(s: CharArray) {
    var l = 0; var r = s.size - 1
    while (l < r) { s[l] = s[r].also { s[r] = s[l] }; l++; r-- }
}

// Reverse words: "the sky is blue" -> "blue is sky the"
fun reverseWords(s: String): String {
    val words = s.trim().split("\\s+".toRegex())
    return words.reversed().joinToString(" ")
}

// In-place rotate array right by k (three reversals trick)
fun rotate(nums: IntArray, k: Int) {
    val n = nums.size; val shift = k % n
    fun rev(l: Int, r: Int) {
        var a = l; var b = r
        while (a < b) { nums[a] = nums[b].also { nums[b] = nums[a] }; a++; b-- }
    }
    rev(0, n - 1); rev(0, shift - 1); rev(shift, n - 1)
}`,
      },
    ],
  },
  {
    id: 'sliding-window',
    romanNumeral: 'II',
    title: 'Sliding Window Patterns',
    patterns: [
      {
        id: 'fixed-size-window',
        number: 8,
        title: 'Fixed Size Window',
        description: 'Maintain a window of exactly k elements. Add the new right element and remove the leftmost element on each step. Computes aggregates (sum, max, average) over every contiguous subarray of size k in O(n) instead of O(nk).',
        keyInsight: 'The window shrinks and grows by one element at a time — only the delta matters, not a full recomputation.',
        useCases: ['Maximum Sum Subarray of Size K', 'Average of Subarrays of Size K', 'Find All Anagrams', 'Permutation in String'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun maxSumSubarrayOfSizeK(arr: IntArray, k: Int): Int {
    var windowSum = 0
    var maxSum = 0

    for (i in arr.indices) {
        windowSum += arr[i]               // expand right
        if (i >= k) windowSum -= arr[i - k] // shrink left
        if (i >= k - 1) maxSum = maxOf(maxSum, windowSum)
    }
    return maxSum
}`,
      },
      {
        id: 'variable-size-window',
        number: 9,
        title: 'Variable Size Window',
        description: 'Expand the right boundary freely; shrink the left boundary when a constraint is violated. The window size changes dynamically to find the optimal subarray or substring satisfying a condition.',
        keyInsight: 'Both pointers only move forward — each element is added and removed at most once, giving O(n) total.',
        useCases: ['Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Longest Subarray with Sum ≤ K', 'Fruit Into Baskets'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k) for the window state',
        kotlinTemplate: `fun lengthOfLongestSubstring(s: String): Int {
    val freq = HashMap<Char, Int>()
    var left = 0; var maxLen = 0

    for (right in s.indices) {
        freq[s[right]] = (freq[s[right]] ?: 0) + 1

        // Shrink while window is invalid (duplicate exists)
        while ((freq[s[right]] ?: 0) > 1) {
            freq[s[left]] = (freq[s[left]] ?: 1) - 1
            if (freq[s[left]] == 0) freq.remove(s[left])
            left++
        }

        maxLen = maxOf(maxLen, right - left + 1)
    }
    return maxLen
}`,
      },
      {
        id: 'monotonic-queue-window',
        number: 10,
        title: 'Monotonic Queue for Max/Min',
        description: 'Maintain a deque of indices in monotonically decreasing (for max) or increasing (for min) order of their values. The front of the deque always holds the index of the maximum/minimum element in the current window.',
        keyInsight: 'When a new element is larger than elements at the back, those back elements can never be the window max — safely discard them.',
        useCases: ['Sliding Window Maximum', 'Sliding Window Minimum', 'Shortest Subarray with Sum ≥ K'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k)',
        kotlinTemplate: `fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
    val result = IntArray(nums.size - k + 1)
    val deque = ArrayDeque<Int>() // stores indices, decreasing values

    for (i in nums.indices) {
        // Remove indices outside the window
        while (deque.isNotEmpty() && deque.first() < i - k + 1) {
            deque.removeFirst()
        }
        // Maintain decreasing order: remove smaller elements from back
        while (deque.isNotEmpty() && nums[deque.last()] < nums[i]) {
            deque.removeLast()
        }
        deque.addLast(i)

        if (i >= k - 1) result[i - k + 1] = nums[deque.first()]
    }
    return result
}`,
      },
      {
        id: 'character-frequency-matching',
        number: 11,
        title: 'Character Frequency Matching',
        description: 'Track character frequencies in a sliding window using a hash map or fixed-size array. Compare against a target frequency map to detect anagrams, permutations, or substring matches within a larger string.',
        keyInsight: 'Maintain a "have vs need" counter — when all required characters meet their required counts, the window is valid.',
        useCases: ['Find All Anagrams in String', 'Permutation in String', 'Minimum Window Substring', 'Longest Repeating Character Replacement'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) — alphabet size is fixed',
        kotlinTemplate: `fun findAnagrams(s: String, p: String): List<Int> {
    val result = mutableListOf<Int>()
    val need = IntArray(26); val have = IntArray(26)
    for (c in p) need[c - 'a']++

    var left = 0; var matched = 0
    val required = need.count { it > 0 }

    for (right in s.indices) {
        val rc = s[right] - 'a'
        have[rc]++
        if (need[rc] > 0 && have[rc] == need[rc]) matched++

        if (right - left + 1 > p.length) {
            val lc = s[left] - 'a'
            if (need[lc] > 0 && have[lc] == need[lc]) matched--
            have[lc]--; left++
        }
        if (matched == required) result.add(left)
    }
    return result
}`,
      },
    ],
  },
  {
    id: 'tree-traversal',
    romanNumeral: 'III',
    title: 'Tree Traversal Patterns (DFS & BFS)',
    patterns: [
      {
        id: 'level-order-traversal',
        number: 12,
        title: 'Level Order Traversal',
        description: 'Use a queue to visit nodes level by level (BFS). At each step, process all nodes at the current level before enqueuing their children. Returns a list of lists where each inner list contains one level.',
        keyInsight: 'Snapshot the queue size at the start of each level to know exactly how many nodes belong to that level.',
        useCases: ['Binary Tree Level Order Traversal', 'Right Side View', 'Maximum Width of Binary Tree', 'Zigzag Level Order'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun levelOrder(root: TreeNode?): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    if (root == null) return result
    val queue = ArrayDeque<TreeNode>()
    queue.add(root)

    while (queue.isNotEmpty()) {
        val level = mutableListOf<Int>()
        val size = queue.size          // nodes at this level

        repeat(size) {
            val node = queue.removeFirst()
            level.add(node.value)
            node.left?.let { queue.add(it) }
            node.right?.let { queue.add(it) }
        }
        result.add(level)
    }
    return result
}`,
      },
      {
        id: 'recursive-preorder-traversal',
        number: 13,
        title: 'Recursive Preorder Traversal',
        description: 'Visit the current node before its children: Root → Left → Right. Natural for problems that need to process a node before knowing what its subtrees contain, such as serialization or path tracking.',
        keyInsight: 'Preorder visits the root first — ideal when you need to pass state downward (parent info to children).',
        useCases: ['Serialize Binary Tree', 'Path Sum problems', 'Construct from Preorder+Inorder', 'Clone Tree'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) — call stack depth equals tree height',
        kotlinTemplate: `fun preorder(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()

    fun dfs(node: TreeNode?) {
        if (node == null) return
        result.add(node.value)   // process ROOT first
        dfs(node.left)           // then LEFT
        dfs(node.right)          // then RIGHT
    }

    dfs(root)
    return result
}

// Iterative version using explicit stack
fun preorderIterative(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    val stack = ArrayDeque<TreeNode>()
    if (root != null) stack.addLast(root)

    while (stack.isNotEmpty()) {
        val node = stack.removeLast()
        result.add(node.value)
        node.right?.let { stack.addLast(it) }  // push right first
        node.left?.let { stack.addLast(it) }   // so left is processed first
    }
    return result
}`,
      },
      {
        id: 'recursive-inorder-traversal',
        number: 14,
        title: 'Recursive Inorder Traversal',
        description: 'Visit Left → Root → Right. On a Binary Search Tree, inorder traversal yields nodes in sorted ascending order. Essential for problems requiring sorted access to BST elements.',
        keyInsight: 'Inorder on a BST = sorted iteration — use it any time you need the k-th smallest, validate BST, or recover a sorted sequence.',
        useCases: ['Kth Smallest Element in BST', 'Validate Binary Search Tree', 'Binary Tree Inorder Traversal', 'Convert BST to Greater Tree'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        kotlinTemplate: `fun inorderTraversal(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()

    fun dfs(node: TreeNode?) {
        if (node == null) return
        dfs(node.left)           // LEFT
        result.add(node.value)   // ROOT
        dfs(node.right)          // RIGHT
    }

    dfs(root)
    return result
}

// Morris traversal — O(1) space inorder
fun morrisInorder(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    var curr = root
    while (curr != null) {
        if (curr.left == null) {
            result.add(curr.value); curr = curr.right
        } else {
            var prev = curr.left
            while (prev?.right != null && prev.right !== curr) prev = prev.right
            if (prev?.right == null) { prev?.right = curr; curr = curr.left }
            else { prev.right = null; result.add(curr.value); curr = curr.right }
        }
    }
    return result
}`,
      },
      {
        id: 'recursive-postorder-traversal',
        number: 15,
        title: 'Recursive Postorder Traversal',
        description: 'Visit Left → Right → Root — children are fully processed before their parent. Natural for problems that need to aggregate or combine results from subtrees before handling the current node.',
        keyInsight: 'Postorder returns information bottom-up — perfect for computing subtree properties (height, size, diameter) that depend on children.',
        useCases: ['Delete Tree Nodes', 'Binary Tree Maximum Path Sum', 'Diameter of Binary Tree', 'Lowest Common Ancestor'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        kotlinTemplate: `fun postorder(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()

    fun dfs(node: TreeNode?) {
        if (node == null) return
        dfs(node.left)           // LEFT
        dfs(node.right)          // RIGHT
        result.add(node.value)   // ROOT last
    }

    dfs(root)
    return result
}

// Common postorder pattern: compute value from children, return to parent
fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    val leftDepth  = maxDepth(root.left)
    val rightDepth = maxDepth(root.right)
    return 1 + maxOf(leftDepth, rightDepth)  // combine children, return up
}`,
      },
      {
        id: 'lowest-common-ancestor',
        number: 16,
        title: 'Lowest Common Ancestor',
        description: 'Find the deepest node that is an ancestor of both target nodes. In a standard binary tree, recurse: if either target is found, return it; otherwise combine results from left and right subtrees. In a BST, use node values to navigate directly.',
        keyInsight: 'If a node finds one target in its left subtree and another in its right, that node is the LCA.',
        useCases: ['Lowest Common Ancestor of Binary Tree', 'LCA of BST', 'Distance Between Two Nodes', 'Path Between Two Nodes'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        kotlinTemplate: `// General Binary Tree LCA
fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
    if (root == null || root === p || root === q) return root

    val left  = lowestCommonAncestor(root.left, p, q)
    val right = lowestCommonAncestor(root.right, p, q)

    // Both sides found a target -> current node is LCA
    return if (left != null && right != null) root
           else left ?: right
}

// BST LCA (uses values — O(h) with no extra space)
fun lcaBST(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
    if (root == null) return null
    return when {
        p!!.value < root.value && q!!.value < root.value -> lcaBST(root.left, p, q)
        p.value > root.value && q!!.value > root.value   -> lcaBST(root.right, p, q)
        else -> root
    }
}`,
      },
      {
        id: 'serialization-deserialization',
        number: 17,
        title: 'Serialization and Deserialization',
        description: 'Convert a tree to a string representation and reconstruct it exactly. Preorder DFS with null markers is the most common approach, using a delimiter-separated string and a pointer/queue to track position during reconstruction.',
        keyInsight: 'Encode null children explicitly — without them, the structure is ambiguous and reconstruction fails.',
        useCases: ['Serialize and Deserialize Binary Tree', 'Encode N-ary Tree', 'Verify Preorder Serialization'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun serialize(root: TreeNode?): String {
    val sb = StringBuilder()
    fun dfs(node: TreeNode?) {
        if (node == null) { sb.append("null,"); return }
        sb.append("\${node.value},")
        dfs(node.left); dfs(node.right)
    }
    dfs(root)
    return sb.toString()
}

fun deserialize(data: String): TreeNode? {
    val tokens = ArrayDeque(data.split(","))
    fun dfs(): TreeNode? {
        val token = tokens.removeFirst()
        if (token == "null") return null
        val node = TreeNode(token.toInt())
        node.left  = dfs()
        node.right = dfs()
        return node
    }
    return dfs()
}`,
      },
    ],
  },
  {
    id: 'graph-traversal',
    romanNumeral: 'IV',
    title: 'Graph Traversal Patterns (DFS & BFS)',
    patterns: [
      {
        id: 'dfs-connected-components',
        number: 18,
        title: 'DFS — Connected Components / Island Counting',
        description: 'Iterate over every node. When an unvisited node is found, increment the component count and run DFS to mark all reachable nodes as visited. After DFS completes, any newly found unvisited node starts a new component.',
        keyInsight: 'One DFS call from an unvisited node visits exactly one connected component — so counting DFS calls counts components.',
        useCases: ['Number of Islands', 'Number of Connected Components', 'Friend Circles', 'Count Sub Islands'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V) visited set + O(V) call stack',
        kotlinTemplate: `fun numIslands(grid: Array<CharArray>): Int {
    var count = 0
    val rows = grid.size; val cols = grid[0].size

    fun dfs(r: Int, c: Int) {
        if (r !in 0 until rows || c !in 0 until cols || grid[r][c] != '1') return
        grid[r][c] = '0'  // mark visited in-place
        dfs(r + 1, c); dfs(r - 1, c)
        dfs(r, c + 1); dfs(r, c - 1)
    }

    for (r in 0 until rows)
        for (c in 0 until cols)
            if (grid[r][c] == '1') { count++; dfs(r, c) }

    return count
}`,
      },
      {
        id: 'bfs-connected-components',
        number: 19,
        title: 'BFS — Connected Components / Island Counting',
        description: 'Same component-counting goal as DFS but uses a queue instead of recursion. BFS avoids stack overflow on large grids and naturally finds shortest paths if needed. Mark cells visited when enqueued, not when dequeued, to prevent duplicates.',
        keyInsight: 'Mark nodes as visited when you add them to the queue — not when you process them — to avoid adding the same node multiple times.',
        useCases: ['Number of Islands (BFS)', 'Rotting Oranges', 'Walls and Gates', 'Shortest Bridge'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun numIslandsBFS(grid: Array<CharArray>): Int {
    var count = 0
    val rows = grid.size; val cols = grid[0].size
    val dirs = arrayOf(intArrayOf(1,0), intArrayOf(-1,0), intArrayOf(0,1), intArrayOf(0,-1))

    for (r in 0 until rows) {
        for (c in 0 until cols) {
            if (grid[r][c] != '1') continue
            count++
            val queue = ArrayDeque<Pair<Int,Int>>()
            queue.add(r to c); grid[r][c] = '0'

            while (queue.isNotEmpty()) {
                val (cr, cc) = queue.removeFirst()
                for (d in dirs) {
                    val nr = cr + d[0]; val nc = cc + d[1]
                    if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == '1') {
                        grid[nr][nc] = '0'; queue.add(nr to nc)
                    }
                }
            }
        }
    }
    return count
}`,
      },
      {
        id: 'dfs-cycle-detection',
        number: 20,
        title: 'DFS — Cycle Detection',
        description: 'Track nodes in the current DFS path using a "recursion stack" set, separate from the general visited set. If DFS encounters a node already in the recursion stack, a back edge (cycle) exists. Works for both directed and undirected graphs.',
        keyInsight: 'Visited = seen before; in-stack = on the current path. A cycle means we reached a node already on our current path.',
        useCases: ['Course Schedule (detect cycle)', 'Detect Cycle in Directed Graph', 'Find Eventual Safe States', 'Deadlock Detection'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
    val graph = Array(numCourses) { mutableListOf<Int>() }
    for ((a, b) in prerequisites) graph[b].add(a)

    // 0=unvisited, 1=in current path, 2=fully processed
    val state = IntArray(numCourses)

    fun hasCycle(node: Int): Boolean {
        if (state[node] == 1) return true   // back edge -> cycle
        if (state[node] == 2) return false  // already safe

        state[node] = 1  // mark as in current path
        for (neighbor in graph[node])
            if (hasCycle(neighbor)) return true
        state[node] = 2  // fully processed, mark safe
        return false
    }

    return (0 until numCourses).none { hasCycle(it) }
}`,
      },
      {
        id: 'bfs-topological-sort',
        number: 21,
        title: "BFS — Topological Sort (Kahn's Algorithm)",
        description: "Compute in-degrees for all nodes. Enqueue nodes with in-degree 0. Repeatedly dequeue a node, add it to the result, and decrement its neighbors' in-degrees — enqueue any neighbor that reaches 0. If result length equals node count, no cycle exists.",
        keyInsight: "Nodes with in-degree 0 have no prerequisites — they're always safe to process first. Removing them may free up more nodes.",
        useCases: ['Course Schedule II (ordering)', 'Alien Dictionary', 'Task Dependency Ordering', 'Build Systems'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
    val graph = Array(numCourses) { mutableListOf<Int>() }
    val inDegree = IntArray(numCourses)

    for ((a, b) in prerequisites) { graph[b].add(a); inDegree[a]++ }

    val queue = ArrayDeque<Int>()
    for (i in 0 until numCourses) if (inDegree[i] == 0) queue.add(i)

    val order = mutableListOf<Int>()
    while (queue.isNotEmpty()) {
        val course = queue.removeFirst()
        order.add(course)
        for (next in graph[course]) {
            inDegree[next]--
            if (inDegree[next] == 0) queue.add(next)
        }
    }
    return if (order.size == numCourses) order.toIntArray() else intArrayOf()
}`,
      },
      {
        id: 'deep-copy-cloning',
        number: 22,
        title: 'Deep Copy / Cloning',
        description: 'Traverse the original graph using DFS or BFS. Use a hash map from original node to its clone to handle cycles and shared references. Create the clone node on first visit, then recursively/iteratively clone all neighbors.',
        keyInsight: 'The map serves double duty: it tracks visited nodes AND maps originals to their clones, resolving both cycles and shared structure.',
        useCases: ['Clone Graph', 'Copy List with Random Pointer', 'Deep Copy Data Structures'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun cloneGraph(node: Node?): Node? {
    if (node == null) return null
    val visited = HashMap<Node, Node>()

    fun clone(original: Node): Node {
        visited[original]?.let { return it }

        val copy = Node(original.value)
        visited[original] = copy  // register BEFORE recursing to handle cycles

        for (neighbor in original.neighbors) {
            copy.neighbors.add(clone(neighbor))
        }
        return copy
    }

    return clone(node)
}`,
      },
      {
        id: 'dijkstras-shortest-path',
        number: 23,
        title: "Shortest Path (Dijkstra's)",
        description: "Uses a min-heap (priority queue) ordered by cumulative distance. Always processes the closest unvisited node next. Relaxes neighboring edges: if a shorter path to a neighbor is found via the current node, update and enqueue it. Only works for non-negative weights.",
        keyInsight: 'Greedy correctness relies on non-negative weights — the first time you pop a node from the heap, you have found its shortest path.',
        useCases: ['Network Delay Time', 'Cheapest Flights Within K Stops', 'Path With Minimum Effort', 'Dijkstra on Grid'],
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V + E)',
        kotlinTemplate: `fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {
    val graph = HashMap<Int, MutableList<Pair<Int,Int>>>()
    for ((u, v, w) in times) graph.getOrPut(u) { mutableListOf() }.add(v to w)

    val dist = IntArray(n + 1) { Int.MAX_VALUE }
    dist[k] = 0
    val pq = PriorityQueue<Pair<Int,Int>>(compareBy { it.second })
    pq.add(k to 0)

    while (pq.isNotEmpty()) {
        val (u, d) = pq.poll()
        if (d > dist[u]) continue  // stale entry
        for ((v, w) in graph[u] ?: emptyList()) {
            val newDist = dist[u] + w
            if (newDist < dist[v]) {
                dist[v] = newDist
                pq.add(v to newDist)
            }
        }
    }

    val maxDist = dist.drop(1).max() ?: Int.MAX_VALUE
    return if (maxDist == Int.MAX_VALUE) -1 else maxDist
}`,
      },
      {
        id: 'bellman-ford-shortest-path',
        number: 24,
        title: 'Shortest Path (Bellman-Ford / BFS+K)',
        description: 'Relax all edges V-1 times. Each pass guarantees shortest paths using at most one more edge. Handles negative weights (unlike Dijkstra) and detects negative cycles on the V-th relaxation. BFS+K variant limits the number of hops.',
        keyInsight: 'After k relaxations, dist[v] holds the shortest path using at most k edges — perfect for "at most K stops" problems.',
        useCases: ['Cheapest Flights Within K Stops', 'Bellman-Ford negative cycle detection', 'Shortest Path in Graph with Constraints'],
        timeComplexity: 'O(V × E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
    var prices = IntArray(n) { Int.MAX_VALUE }
    prices[src] = 0

    // Relax edges k+1 times (k stops = k+1 edges)
    repeat(k + 1) {
        val temp = prices.copyOf()
        for ((u, v, w) in flights) {
            if (prices[u] != Int.MAX_VALUE && prices[u] + w < temp[v]) {
                temp[v] = prices[u] + w
            }
        }
        prices = temp  // use snapshot to prevent using edges from this round
    }
    return if (prices[dst] == Int.MAX_VALUE) -1 else prices[dst]
}`,
      },
      {
        id: 'union-find',
        number: 25,
        title: 'Union-Find (Disjoint Set Union)',
        description: 'Maintain a forest of trees where each tree represents a connected component. Find with path compression and Union by rank achieve near-constant amortized operations. Efficiently answers "are these two nodes in the same component?" and merges components.',
        keyInsight: 'Path compression (making every node point directly to root) and union by rank together give amortized O(α(n)) ≈ O(1) per operation.',
        useCases: ['Number of Connected Components', 'Redundant Connection', 'Accounts Merge', 'Minimum Spanning Tree (Kruskal)'],
        timeComplexity: 'O(α(n)) per operation',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `class UnionFind(n: Int) {
    private val parent = IntArray(n) { it }
    private val rank   = IntArray(n) { 0 }
    var components = n

    fun find(x: Int): Int {
        if (parent[x] != x) parent[x] = find(parent[x])  // path compression
        return parent[x]
    }

    fun union(x: Int, y: Int): Boolean {
        val px = find(x); val py = find(y)
        if (px == py) return false  // already connected
        // Union by rank
        when {
            rank[px] < rank[py] -> parent[px] = py
            rank[px] > rank[py] -> parent[py] = px
            else -> { parent[py] = px; rank[px]++ }
        }
        components--
        return true
    }

    fun connected(x: Int, y: Int) = find(x) == find(y)
}`,
      },
      {
        id: 'strongly-connected-components',
        number: 26,
        title: 'Strongly Connected Components (Kosaraju / Tarjan)',
        description: "Kosaraju's: run DFS on original graph, record finish-time order; transpose graph; run DFS in reverse finish order — each DFS tree is an SCC. Tarjan's: single DFS with discovery/low-link values, using a stack to group SCCs.",
        keyInsight: "In Kosaraju's, transposing the graph reverses edges — an SCC remains strongly connected, but cross-component paths break, isolating each SCC.",
        useCases: ['Find Strongly Connected Components', 'Critical Connections', 'Condensation Graph for DP'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `// Kosaraju's Algorithm
fun kosarajuSCC(n: Int, adj: Array<MutableList<Int>>): List<List<Int>> {
    val visited = BooleanArray(n)
    val order = ArrayDeque<Int>()

    fun dfs1(u: Int) {
        visited[u] = true
        for (v in adj[u]) if (!visited[v]) dfs1(v)
        order.addLast(u)
    }

    val radj = Array(n) { mutableListOf<Int>() }
    for (u in 0 until n) for (v in adj[u]) radj[v].add(u)

    for (i in 0 until n) if (!visited[i]) dfs1(i)
    visited.fill(false)
    val sccs = mutableListOf<List<Int>>()

    fun dfs2(u: Int, scc: MutableList<Int>) {
        visited[u] = true; scc.add(u)
        for (v in radj[u]) if (!visited[v]) dfs2(v, scc)
    }

    while (order.isNotEmpty()) {
        val u = order.removeLast()
        if (!visited[u]) { val scc = mutableListOf<Int>(); dfs2(u, scc); sccs.add(scc) }
    }
    return sccs
}`,
      },
      {
        id: 'bridges-articulation-points',
        number: 27,
        title: 'Bridges & Articulation Points (Tarjan low-link)',
        description: "Track each node's discovery time and low-link value (lowest discovery time reachable). An edge (u,v) is a bridge if low[v] > disc[u]. A node u is an articulation point if it has a child v in DFS tree where low[v] >= disc[u] (with a root special case).",
        keyInsight: 'The low-link value propagates the "earliest ancestor reachable via back edges" — if a subtree cannot reach above u, removing u disconnects the graph.',
        useCases: ['Critical Connections in Network', 'Find Bridges', 'Find Articulation Points'],
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        kotlinTemplate: `fun criticalConnections(n: Int, connections: List<List<Int>>): List<List<Int>> {
    val graph = Array(n) { mutableListOf<Int>() }
    for ((u, v) in connections) { graph[u].add(v); graph[v].add(u) }

    val disc = IntArray(n) { -1 }
    val low  = IntArray(n)
    val bridges = mutableListOf<List<Int>>()
    var timer = 0

    fun dfs(u: Int, parent: Int) {
        disc[u] = timer; low[u] = timer++
        for (v in graph[u]) {
            if (disc[v] == -1) {
                dfs(v, u)
                low[u] = minOf(low[u], low[v])
                if (low[v] > disc[u]) bridges.add(listOf(u, v))  // bridge!
            } else if (v != parent) {
                low[u] = minOf(low[u], disc[v])
            }
        }
    }

    for (i in 0 until n) if (disc[i] == -1) dfs(i, -1)
    return bridges
}`,
      },
      {
        id: 'minimum-spanning-tree',
        number: 28,
        title: 'Minimum Spanning Tree (Kruskal / Prim)',
        description: "Kruskal's: sort edges by weight, greedily add edges that don't form a cycle (use Union-Find). Prim's: start from any node, always add the cheapest edge connecting the MST to a non-MST node (use min-heap). Both produce a spanning tree of minimum total weight.",
        keyInsight: "Kruskal's is edge-centric (sort and pick globally cheapest safe edges); Prim's is vertex-centric (grow MST one closest vertex at a time).",
        useCases: ['Minimum Cost to Connect All Points', 'Min Cost to Connect Ropes', 'Optimize Water Distribution'],
        timeComplexity: 'O(E log E) Kruskal, O(E log V) Prim',
        spaceComplexity: 'O(V + E)',
        kotlinTemplate: `// Kruskal's MST using Union-Find
fun minCostConnectPoints(points: Array<IntArray>): Int {
    val n = points.size
    val edges = mutableListOf<Triple<Int,Int,Int>>()
    for (i in 0 until n)
        for (j in i+1 until n)
            edges.add(Triple(
                Math.abs(points[i][0]-points[j][0]) + Math.abs(points[i][1]-points[j][1]),
                i, j))
    edges.sortBy { it.first }

    val uf = UnionFind(n)  // see Pattern 25
    var cost = 0; var edgesUsed = 0

    for ((w, u, v) in edges) {
        if (uf.union(u, v)) {
            cost += w; edgesUsed++
            if (edgesUsed == n - 1) break
        }
    }
    return cost
}`,
      },
      {
        id: 'bidirectional-bfs',
        number: 29,
        title: 'Bidirectional BFS',
        description: 'Run two BFS searches simultaneously — one from the source, one from the target — and stop when they meet in the middle. Dramatically reduces the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is distance.',
        keyInsight: 'Always expand from the smaller frontier — this keeps both searches balanced and minimizes total nodes visited.',
        useCases: ['Word Ladder', 'Shortest Path in Large Graph', 'Six Degrees of Separation'],
        timeComplexity: 'O(b^(d/2)) vs O(b^d) for single BFS',
        spaceComplexity: 'O(b^(d/2))',
        kotlinTemplate: `fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
    val wordSet = wordList.toHashSet()
    if (endWord !in wordSet) return 0

    var frontSet = hashSetOf(beginWord)
    var backSet  = hashSetOf(endWord)
    var steps = 1

    while (frontSet.isNotEmpty()) {
        if (frontSet.size > backSet.size) { val tmp = frontSet; frontSet = backSet; backSet = tmp }
        val nextSet = hashSetOf<String>()
        for (word in frontSet) {
            val chars = word.toCharArray()
            for (i in chars.indices) {
                val orig = chars[i]
                for (c in 'a'..'z') {
                    chars[i] = c
                    val next = String(chars)
                    if (next in backSet) return steps + 1
                    if (next in wordSet) { wordSet.remove(next); nextSet.add(next) }
                }
                chars[i] = orig
            }
        }
        frontSet = nextSet; steps++
    }
    return 0
}`,
      },
    ],
  },
  {
    id: 'dynamic-programming',
    romanNumeral: 'V',
    title: 'Dynamic Programming (DP) Patterns',
    patterns: [
      {
        id: 'fibonacci-style-dp',
        number: 30,
        title: 'Fibonacci Style',
        description: 'Each state depends on a fixed number of previous states (usually the last 1 or 2). The recurrence is simple: dp[i] = f(dp[i-1], dp[i-2], ...). Can always be space-optimized from O(n) array to O(1) rolling variables.',
        keyInsight: 'When dp[i] only needs the last k values, keep only those k variables — no need for the full array.',
        useCases: ['Climbing Stairs', 'House Robber', 'Tribonacci Number', 'Min Cost Climbing Stairs'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) with optimization',
        kotlinTemplate: `// Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]
fun climbStairs(n: Int): Int {
    if (n <= 2) return n
    var prev2 = 1; var prev1 = 2
    for (i in 3..n) {
        val curr = prev1 + prev2
        prev2 = prev1; prev1 = curr
    }
    return prev1
}

// House Robber: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
fun rob(nums: IntArray): Int {
    var prev2 = 0; var prev1 = 0
    for (num in nums) {
        val curr = maxOf(prev1, prev2 + num)
        prev2 = prev1; prev1 = curr
    }
    return prev1
}`,
      },
      {
        id: 'kadanes-algorithm',
        number: 31,
        title: "Kadane's Algorithm for Max/Min Subarray",
        description: 'At each index, decide: extend the existing subarray or start a new one here. Track the local maximum/minimum ending at the current position and the global best seen. Achieves O(n) with O(1) space.',
        keyInsight: 'If the current running sum becomes worse than starting fresh from this element, reset — the previous subarray is a liability.',
        useCases: ['Maximum Subarray', 'Maximum Product Subarray', 'Maximum Sum Circular Subarray'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun maxSubArray(nums: IntArray): Int {
    var currentMax = nums[0]
    var globalMax  = nums[0]

    for (i in 1 until nums.size) {
        // Either extend existing subarray or start fresh
        currentMax = maxOf(nums[i], currentMax + nums[i])
        globalMax  = maxOf(globalMax, currentMax)
    }
    return globalMax
}

// Max product variant: track both max and min (negative * negative = positive)
fun maxProduct(nums: IntArray): Int {
    var curMax = nums[0]; var curMin = nums[0]; var res = nums[0]
    for (i in 1 until nums.size) {
        val candidates = intArrayOf(nums[i], curMax * nums[i], curMin * nums[i])
        curMax = candidates.max()!!; curMin = candidates.min()!!
        res = maxOf(res, curMax)
    }
    return res
}`,
      },
      {
        id: 'coin-change-unbounded-knapsack',
        number: 32,
        title: 'Coin Change / Unbounded Knapsack',
        description: 'Items can be used unlimited times. Build dp[amount] where dp[i] = minimum coins (or number of ways) to make amount i. For each coin, iterate over all amounts ≥ coin value and update using the same dp array (unbounded reuse).',
        keyInsight: 'Iterating amounts in forward order (smallest to largest) allows reusing coins — the same coin can contribute multiple times.',
        useCases: ['Coin Change', 'Coin Change II (ways)', 'Unbounded Knapsack', 'Integer Break'],
        timeComplexity: 'O(amount × coins)',
        spaceComplexity: 'O(amount)',
        kotlinTemplate: `// Minimum coins
fun coinChange(coins: IntArray, amount: Int): Int {
    val dp = IntArray(amount + 1) { Int.MAX_VALUE }
    dp[0] = 0

    for (a in 1..amount) {
        for (coin in coins) {
            if (coin <= a && dp[a - coin] != Int.MAX_VALUE) {
                dp[a] = minOf(dp[a], dp[a - coin] + 1)
            }
        }
    }
    return if (dp[amount] == Int.MAX_VALUE) -1 else dp[amount]
}

// Number of ways (combination sum IV style)
fun change(amount: Int, coins: IntArray): Int {
    val dp = IntArray(amount + 1)
    dp[0] = 1
    for (coin in coins)        // outer loop on coins -> each coin used in order
        for (a in coin..amount)
            dp[a] += dp[a - coin]
    return dp[amount]
}`,
      },
      {
        id: 'zero-one-knapsack',
        number: 33,
        title: '0/1 Knapsack / Subset Sum',
        description: 'Each item can be used at most once. dp[i][w] = max value using first i items with capacity w. Iterate items in outer loop, capacity in reverse inner loop (to prevent reuse). Space-optimized to 1D by traversing capacity in reverse.',
        keyInsight: 'Iterating capacity in reverse prevents using the same item twice — the new dp[w] relies on the old dp[w - weight] from the previous iteration.',
        useCases: ['0/1 Knapsack', 'Partition Equal Subset Sum', 'Target Sum', 'Last Stone Weight II'],
        timeComplexity: 'O(n × W)',
        spaceComplexity: 'O(W)',
        kotlinTemplate: `fun canPartition(nums: IntArray): Boolean {
    val total = nums.sum()
    if (total % 2 != 0) return false
    val target = total / 2

    val dp = BooleanArray(target + 1)
    dp[0] = true

    for (num in nums) {
        // Reverse to avoid using same num twice
        for (j in target downTo num) {
            dp[j] = dp[j] || dp[j - num]
        }
    }
    return dp[target]
}`,
      },
      {
        id: 'word-break-style-dp',
        number: 34,
        title: 'Word Break Style',
        description: 'dp[i] = true if the first i characters of the string can be segmented. For each position i, try all possible last word endings j < i: if dp[j] is true and s[j..i] is a valid word, set dp[i] = true.',
        keyInsight: 'Think of dp[i] as "can I build a valid sentence using the first i characters" — it answers the same question for every prefix.',
        useCases: ['Word Break', 'Word Break II (all paths)', 'Concatenated Words', 'Palindrome Partitioning II'],
        timeComplexity: 'O(n² × m) where m = average word length',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun wordBreak(s: String, wordDict: List<String>): Boolean {
    val wordSet = wordDict.toHashSet()
    val dp = BooleanArray(s.length + 1)
    dp[0] = true  // empty string is always segmentable

    for (i in 1..s.length) {
        for (j in 0 until i) {
            if (dp[j] && s.substring(j, i) in wordSet) {
                dp[i] = true
                break
            }
        }
    }
    return dp[s.length]
}`,
      },
      {
        id: 'longest-common-subsequence',
        number: 35,
        title: 'Longest Common Subsequence (LCS)',
        description: 'Build a 2D table where dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]. If characters match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Foundation for many string comparison problems.',
        keyInsight: 'When characters match, the LCS extends by 1 from the diagonal; when they don\'t, take the best result from excluding one character at a time.',
        useCases: ['Longest Common Subsequence', 'Edit Distance', 'Shortest Common Supersequence', 'Delete Operations for Two Strings'],
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(m × n), optimizable to O(min(m,n))',
        kotlinTemplate: `fun longestCommonSubsequence(text1: String, text2: String): Int {
    val m = text1.length; val n = text2.length
    val dp = Array(m + 1) { IntArray(n + 1) }

    for (i in 1..m) {
        for (j in 1..n) {
            dp[i][j] = if (text1[i-1] == text2[j-1])
                dp[i-1][j-1] + 1
            else
                maxOf(dp[i-1][j], dp[i][j-1])
        }
    }
    return dp[m][n]
}`,
      },
      {
        id: 'edit-distance',
        number: 36,
        title: 'Edit Distance / Levenshtein Distance',
        description: 'dp[i][j] = minimum operations (insert, delete, replace) to convert word1[0..i-1] to word2[0..j-1]. If characters match: dp[i][j] = dp[i-1][j-1]. Otherwise: min of insert (dp[i][j-1]+1), delete (dp[i-1][j]+1), replace (dp[i-1][j-1]+1).',
        keyInsight: 'The three operations correspond to the three neighboring cells in the DP table — left (insert), above (delete), diagonal (replace/match).',
        useCases: ['Edit Distance', 'One Edit Distance', 'Minimum ASCII Delete Sum', 'Wildcard Matching'],
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(m × n)',
        kotlinTemplate: `fun minDistance(word1: String, word2: String): Int {
    val m = word1.length; val n = word2.length
    val dp = Array(m + 1) { IntArray(n + 1) }

    // Base cases: converting to/from empty string
    for (i in 0..m) dp[i][0] = i
    for (j in 0..n) dp[0][j] = j

    for (i in 1..m) {
        for (j in 1..n) {
            dp[i][j] = if (word1[i-1] == word2[j-1])
                dp[i-1][j-1]  // no operation needed
            else
                1 + minOf(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
                //          replace       delete      insert
        }
    }
    return dp[m][n]
}`,
      },
      {
        id: 'unique-paths-grid',
        number: 37,
        title: 'Unique Paths on Grid',
        description: 'dp[r][c] = number of ways to reach cell (r,c) from top-left, moving only right or down. dp[r][c] = dp[r-1][c] + dp[r][c-1]. With obstacles, set dp to 0 at blocked cells. Can be optimized to O(n) space using a single row.',
        keyInsight: 'You can only arrive from the left or from above — sum those two to get the total paths to any cell.',
        useCases: ['Unique Paths', 'Unique Paths II (obstacles)', 'Minimum Path Sum', 'Dungeon Game'],
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(n) with space optimization',
        kotlinTemplate: `fun uniquePaths(m: Int, n: Int): Int {
    val dp = IntArray(n) { 1 }  // first row is all 1s

    for (r in 1 until m) {
        for (c in 1 until n) {
            dp[c] += dp[c - 1]  // dp[c] = from above, dp[c-1] = from left
        }
    }
    return dp[n - 1]
}

fun minPathSum(grid: Array<IntArray>): Int {
    val m = grid.size; val n = grid[0].size
    val dp = IntArray(n)
    for (r in 0 until m) {
        for (c in 0 until n) {
            dp[c] = when {
                r == 0 && c == 0 -> grid[0][0]
                r == 0           -> dp[c - 1] + grid[r][c]
                c == 0           -> dp[c]     + grid[r][c]
                else             -> minOf(dp[c], dp[c-1]) + grid[r][c]
            }
        }
    }
    return dp[n - 1]
}`,
      },
      {
        id: 'interval-dp',
        number: 38,
        title: 'Interval DP',
        description: 'dp[i][j] represents the optimal value for the subproblem on the interval [i, j]. Build solutions bottom-up by increasing interval length. For each interval, try every possible split point k and combine the two sub-intervals dp[i][k] and dp[k+1][j].',
        keyInsight: 'Start with intervals of length 1 (base cases), then combine to form longer intervals — the order of operations matters and is encoded in the split point.',
        useCases: ['Burst Balloons', 'Matrix Chain Multiplication', 'Minimum Cost to Merge Stones', 'Strange Printer'],
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n²)',
        kotlinTemplate: `fun maxCoins(nums: IntArray): Int {
    // Pad with 1s on both sides
    val n = nums.size
    val arr = IntArray(n + 2)
    arr[0] = 1; arr[n + 1] = 1
    for (i in nums.indices) arr[i + 1] = nums[i]

    val size = n + 2
    val dp = Array(size) { IntArray(size) }

    // len = length of interval, not counting boundary
    for (len in 1..n) {
        for (left in 1..n - len + 1) {
            val right = left + len - 1
            for (k in left..right) {
                // k is the LAST balloon burst in [left, right]
                dp[left][right] = maxOf(dp[left][right],
                    arr[left-1] * arr[k] * arr[right+1] + dp[left][k-1] + dp[k+1][right])
            }
        }
    }
    return dp[1][n]
}`,
      },
      {
        id: 'catalan-numbers',
        number: 39,
        title: 'Catalan Numbers',
        description: 'Catalan numbers count many combinatorial structures: valid parentheses sequences, BST shapes, triangulations. C(n) = sum of C(i)*C(n-1-i) for i in 0..n-1. Appears in problems that involve pairing or splitting into two independent subproblems.',
        keyInsight: 'Whenever a problem asks "how many valid structures with n elements where you split into left and right halves at each position", that\'s a Catalan recurrence.',
        useCases: ['Unique Binary Search Trees', 'Valid Parentheses (count)', 'Different Ways to Add Parentheses'],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `// Number of structurally unique BSTs with n nodes
fun numTrees(n: Int): Int {
    val dp = IntArray(n + 1)
    dp[0] = 1; dp[1] = 1

    // C(n) = sum over all possible root positions
    for (i in 2..n) {
        for (j in 1..i) {
            // j is root: j-1 nodes on left, i-j on right
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }
    return dp[n]
}
// Catalan: 1, 1, 2, 5, 14, 42, 132...`,
      },
      {
        id: 'longest-increasing-subsequence',
        number: 40,
        title: 'Longest Increasing Subsequence (LIS)',
        description: 'O(n²) DP: dp[i] = length of LIS ending at index i. For each j < i, if nums[j] < nums[i], dp[i] = max(dp[i], dp[j]+1). O(n log n) approach: maintain a "tails" array and use binary search to maintain the smallest tail for each LIS length.',
        keyInsight: 'In the O(n log n) approach, tails[i] stores the smallest possible tail of an increasing subsequence of length i+1 — binary search finds where to extend or replace.',
        useCases: ['Longest Increasing Subsequence', 'Russian Doll Envelopes', 'Number of LIS', 'Longest Chain of Pairs'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun lengthOfLIS(nums: IntArray): Int {
    val tails = mutableListOf<Int>()

    for (num in nums) {
        var lo = 0; var hi = tails.size
        // Binary search for first tail >= num
        while (lo < hi) {
            val mid = (lo + hi) / 2
            if (tails[mid] < num) lo = mid + 1 else hi = mid
        }
        if (lo == tails.size) tails.add(num)   // extend LIS
        else tails[lo] = num                    // replace with smaller tail
    }
    return tails.size
}`,
      },
      {
        id: 'stock-problems-dp',
        number: 41,
        title: 'Stock Problems',
        description: 'Model state as (day, transactions_used, holding). Transition: on each day either do nothing, buy (if not holding), or sell (if holding). Constraints on number of transactions change the state space. Most variants reduce to O(n) with careful state tracking.',
        keyInsight: 'Define states clearly: hold vs not-hold, and transactions remaining. The recurrence then falls naturally from "what action maximizes profit today?"',
        useCases: ['Best Time to Buy/Sell Stock I–VI', 'Buy/Sell with Cooldown', 'Buy/Sell with Transaction Fee'],
        timeComplexity: 'O(n) for most variants',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// At most 2 transactions
fun maxProfitTwoTransactions(prices: IntArray): Int {
    var buy1 = Int.MIN_VALUE; var sell1 = 0
    var buy2 = Int.MIN_VALUE; var sell2 = 0

    for (price in prices) {
        buy1  = maxOf(buy1,  -price)
        sell1 = maxOf(sell1, buy1 + price)
        buy2  = maxOf(buy2,  sell1 - price)
        sell2 = maxOf(sell2, buy2 + price)
    }
    return sell2
}

// With cooldown (1 day after sell)
fun maxProfitCooldown(prices: IntArray): Int {
    var hold = Int.MIN_VALUE; var sold = 0; var rest = 0
    for (price in prices) {
        val prevSold = sold
        sold = hold + price
        hold = maxOf(hold, rest - price)
        rest = maxOf(rest, prevSold)
    }
    return maxOf(sold, rest)
}`,
      },
    ],
  },
  {
    id: 'heap-priority-queue',
    romanNumeral: 'VI',
    title: 'Heap (Priority Queue) Patterns',
    patterns: [
      {
        id: 'top-k-elements',
        number: 42,
        title: 'Top K Elements',
        description: 'Maintain a min-heap of size k while streaming elements. When the heap exceeds k, remove the minimum. After processing all elements, the heap contains the k largest. For k smallest, use a max-heap instead.',
        keyInsight: 'A min-heap of size k efficiently tracks the k largest elements seen so far — the root is always the smallest of the k largest (the "gatekeaper").',
        useCases: ['Kth Largest Element', 'Top K Frequent Elements', 'K Closest Points to Origin', 'Find K Pairs with Smallest Sums'],
        timeComplexity: 'O(n log k)',
        spaceComplexity: 'O(k)',
        kotlinTemplate: `fun findKthLargest(nums: IntArray, k: Int): Int {
    val minHeap = PriorityQueue<Int>()  // min-heap by default

    for (num in nums) {
        minHeap.offer(num)
        if (minHeap.size > k) minHeap.poll()  // evict smallest
    }
    return minHeap.peek()!!
}

fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val freq = HashMap<Int, Int>()
    for (n in nums) freq[n] = (freq[n] ?: 0) + 1

    // Min-heap ordered by frequency
    val heap = PriorityQueue<Map.Entry<Int,Int>>(compareBy { it.value })
    for (entry in freq.entries) {
        heap.offer(entry)
        if (heap.size > k) heap.poll()
    }
    return heap.map { it.key }.toIntArray()
}`,
      },
      {
        id: 'two-heaps-median',
        number: 43,
        title: 'Two Heaps for Median Finding',
        description: 'Maintain a max-heap for the lower half and a min-heap for the upper half of the stream. Balance them so their sizes differ by at most 1. The median is the top of the larger heap (or average of both tops if equal size).',
        keyInsight: 'The lower-half max-heap and upper-half min-heap together maintain a sorted partition — tops of both heaps are the two "middle" elements.',
        useCases: ['Find Median from Data Stream', 'Sliding Window Median', 'IPO (maximize capital)'],
        timeComplexity: 'O(log n) per insertion, O(1) for median',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `class MedianFinder {
    private val lo = PriorityQueue<Int>(reverseOrder())  // max-heap: lower half
    private val hi = PriorityQueue<Int>()                // min-heap: upper half

    fun addNum(num: Int) {
        lo.offer(num)
        hi.offer(lo.poll())          // balance: push lo's max to hi
        if (lo.size < hi.size)
            lo.offer(hi.poll())      // keep lo >= hi in size
    }

    fun findMedian(): Double {
        return if (lo.size > hi.size) lo.peek().toDouble()
               else (lo.peek() + hi.peek()) / 2.0
    }
}`,
      },
      {
        id: 'k-way-merge',
        number: 44,
        title: 'K-way Merge',
        description: 'Initialize a min-heap with the first element from each of k sorted lists. Repeatedly extract the minimum, add it to the result, and push the next element from the same list. Generalizes two-list merge to k lists efficiently.',
        keyInsight: 'The heap always holds exactly one candidate from each list — popping the minimum and pushing its successor maintains the global ordering invariant.',
        useCases: ['Merge K Sorted Lists', 'Smallest Range Covering K Lists', 'Find K-th Smallest in Matrix'],
        timeComplexity: 'O(n log k) where n = total elements',
        spaceComplexity: 'O(k)',
        kotlinTemplate: `fun mergeKLists(lists: Array<ListNode?>): ListNode? {
    // Triple: (value, listIndex, node)
    val heap = PriorityQueue<Triple<Int,Int,ListNode>>(compareBy { it.first })

    for ((i, head) in lists.withIndex()) {
        head?.let { heap.offer(Triple(it.value, i, it)) }
    }

    val dummy = ListNode(0); var curr = dummy

    while (heap.isNotEmpty()) {
        val (_, _, node) = heap.poll()
        curr.next = node; curr = curr.next!!
        node.next?.let { heap.offer(Triple(it.value, 0, it)) }
    }
    return dummy.next
}`,
      },
      {
        id: 'scheduling-minimum-cost',
        number: 45,
        title: 'Scheduling / Minimum Cost',
        description: 'Greedily assign tasks by processing the most urgent or cheapest option first using a priority queue. For interval scheduling, sort by end time or deadline, then use a heap to track available workers or the current state.',
        keyInsight: 'A heap lets you always pick the optimal next action (cheapest, earliest deadline) in O(log n) rather than O(n) linear scan.',
        useCases: ['Task Scheduler', 'Meeting Rooms II', 'IPO', 'Minimum Number of Arrows to Burst Balloons'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun leastInterval(tasks: CharArray, n: Int): Int {
    val freq = IntArray(26)
    for (t in tasks) freq[t - 'A']++

    // Max-heap by frequency
    val maxHeap = PriorityQueue<Int>(reverseOrder())
    for (f in freq) if (f > 0) maxHeap.offer(f)

    var time = 0
    while (maxHeap.isNotEmpty()) {
        val cycle = mutableListOf<Int>()
        repeat(n + 1) {
            if (maxHeap.isNotEmpty()) cycle.add(maxHeap.poll())
        }
        for (f in cycle) if (f - 1 > 0) maxHeap.offer(f - 1)
        time += if (maxHeap.isEmpty()) cycle.size else n + 1
    }
    return time
}`,
      },
    ],
  },
  {
    id: 'backtracking',
    romanNumeral: 'VII',
    title: 'Backtracking Patterns',
    patterns: [
      {
        id: 'subsets-include-exclude',
        number: 46,
        title: 'Subsets (Include/Exclude)',
        description: 'At each index, make a binary choice: include the element in the current subset or exclude it. Recurse for both decisions, and add a copy of the current subset to results when the base case (end of array) is reached.',
        keyInsight: 'Every subset corresponds to a unique binary decision sequence — there are exactly 2^n subsets, and this recursion visits them all in O(2^n × n).',
        useCases: ['Subsets', 'Subsets II (with duplicates)', 'Combination Sum III', 'Power Set'],
        timeComplexity: 'O(2^n × n)',
        spaceComplexity: 'O(n) recursion depth',
        kotlinTemplate: `fun subsets(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()

    fun backtrack(index: Int, current: MutableList<Int>) {
        if (index == nums.size) {
            result.add(current.toList()); return
        }
        // Choice 1: include nums[index]
        current.add(nums[index])
        backtrack(index + 1, current)

        // Choice 2: exclude nums[index]
        current.removeAt(current.size - 1)
        backtrack(index + 1, current)
    }

    backtrack(0, mutableListOf())
    return result
}`,
      },
      {
        id: 'permutations',
        number: 47,
        title: 'Permutations',
        description: 'Build permutations by choosing an unused element for each position. Track which elements have been used with a boolean array or by swapping elements in-place. When all positions are filled, add the current permutation to results.',
        keyInsight: 'For each position, try every unused element — undo the choice (backtrack) after the recursive call to restore the "unused" state.',
        useCases: ['Permutations', 'Permutations II (duplicates)', 'Next Permutation', 'Permutation Sequence'],
        timeComplexity: 'O(n! × n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun permute(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val used = BooleanArray(nums.size)

    fun backtrack(current: MutableList<Int>) {
        if (current.size == nums.size) {
            result.add(current.toList()); return
        }
        for (i in nums.indices) {
            if (used[i]) continue
            used[i] = true
            current.add(nums[i])
            backtrack(current)
            current.removeAt(current.size - 1)  // undo
            used[i] = false
        }
    }

    backtrack(mutableListOf())
    return result
}`,
      },
      {
        id: 'combination-sum',
        number: 48,
        title: 'Combination Sum',
        description: 'Find all combinations that sum to a target. Pass the remaining target down the recursion, pruning branches when remaining < 0. Use a start index to avoid duplicate combinations. If elements can be reused, don\'t advance start index.',
        keyInsight: 'The start index prevents revisiting earlier elements, ensuring combinations (not permutations) are generated without duplicates.',
        useCases: ['Combination Sum', 'Combination Sum II', 'Combination Sum III', 'Factor Combinations'],
        timeComplexity: 'O(2^n) worst case',
        spaceComplexity: 'O(target / min_coin) recursion depth',
        kotlinTemplate: `fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
    val result = mutableListOf<List<Int>>()

    fun backtrack(start: Int, remaining: Int, current: MutableList<Int>) {
        if (remaining == 0) { result.add(current.toList()); return }
        if (remaining < 0) return

        for (i in start until candidates.size) {
            current.add(candidates[i])
            backtrack(i, remaining - candidates[i], current)  // i (not i+1): reuse allowed
            current.removeAt(current.size - 1)
        }
    }

    candidates.sort()
    backtrack(0, target, mutableListOf())
    return result
}`,
      },
      {
        id: 'parentheses-generation',
        number: 49,
        title: 'Parentheses Generation',
        description: 'Build valid parentheses strings by tracking open and close counts. At each step, add an open bracket if open < n, or a close bracket if close < open. The string is complete when both counts reach n.',
        keyInsight: 'A close bracket is always valid if there are more open brackets than close brackets in the current prefix — this invariant is the only constraint needed.',
        useCases: ['Generate Parentheses', 'Valid Parentheses Combinations', 'Remove Invalid Parentheses'],
        timeComplexity: 'O(4^n / sqrt(n)) — the nth Catalan number',
        spaceComplexity: 'O(n) recursion depth',
        kotlinTemplate: `fun generateParenthesis(n: Int): List<String> {
    val result = mutableListOf<String>()

    fun backtrack(s: String, open: Int, close: Int) {
        if (s.length == 2 * n) { result.add(s); return }
        if (open < n)     backtrack("$s(", open + 1, close)
        if (close < open) backtrack("$s)", open, close + 1)
    }

    backtrack("", 0, 0)
    return result
}`,
      },
      {
        id: 'word-search-grid',
        number: 50,
        title: 'Word Search / Path Finding in Grid',
        description: 'Perform DFS from each cell, marking the cell as visited before recursing and unvisiting it after. At each step, try all valid neighbors. If the current path matches the target word/pattern, return true.',
        keyInsight: 'Temporarily marking cells as visited (in-place) prevents revisiting within the same path while allowing other paths to reuse the cell.',
        useCases: ['Word Search', 'Word Search II (Trie + DFS)', 'Path Existence in Grid', 'Unique Paths with Obstacles'],
        timeComplexity: 'O(rows × cols × 4^L) where L = word length',
        spaceComplexity: 'O(L) recursion depth',
        kotlinTemplate: `fun exist(board: Array<CharArray>, word: String): Boolean {
    val rows = board.size; val cols = board[0].size

    fun dfs(r: Int, c: Int, idx: Int): Boolean {
        if (idx == word.length) return true
        if (r !in 0 until rows || c !in 0 until cols) return false
        if (board[r][c] != word[idx]) return false

        val temp = board[r][c]
        board[r][c] = '#'  // mark visited
        val found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) ||
                    dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1)
        board[r][c] = temp  // restore
        return found
    }

    for (r in 0 until rows)
        for (c in 0 until cols)
            if (dfs(r, c, 0)) return true
    return false
}`,
      },
      {
        id: 'n-queens',
        number: 51,
        title: 'N-Queens / Constraint Satisfaction',
        description: 'Place items (queens, numbers) one row/position at a time. Use sets to track which columns, diagonals are occupied. Try each valid placement, recurse, and remove the constraint when backtracking. Prune early when constraints are violated.',
        keyInsight: 'For N-Queens, three sets (columns, diag1, diag2) are sufficient to check all attack constraints in O(1) per placement.',
        useCases: ['N-Queens', 'N-Queens II', 'Sudoku Solver', 'Knight Tour'],
        timeComplexity: 'O(n!) pruned significantly by constraints',
        spaceComplexity: 'O(n²)',
        kotlinTemplate: `fun solveNQueens(n: Int): List<List<String>> {
    val result = mutableListOf<List<String>>()
    val cols = HashSet<Int>()
    val diag1 = HashSet<Int>()  // row - col
    val diag2 = HashSet<Int>()  // row + col
    val board = Array(n) { CharArray(n) { '.' } }

    fun backtrack(row: Int) {
        if (row == n) {
            result.add(board.map { String(it) }); return
        }
        for (col in 0 until n) {
            if (col in cols || row-col in diag1 || row+col in diag2) continue
            board[row][col] = 'Q'
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            backtrack(row + 1)
            board[row][col] = '.'
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)
        }
    }

    backtrack(0)
    return result
}`,
      },
      {
        id: 'palindrome-partitioning',
        number: 52,
        title: 'Palindrome Partitioning',
        description: 'Backtrack by trying all possible first-partition cut points. For each prefix that is a palindrome, recurse on the remaining suffix. Pre-compute a 2D palindrome DP table to check any substring in O(1) during backtracking.',
        keyInsight: 'Precompute palindrome membership to avoid redundant checks — isPalin[i][j] can be computed in O(n²) and queried in O(1) during the O(2^n) backtracking.',
        useCases: ['Palindrome Partitioning', 'Palindrome Partitioning II (min cuts)', 'Minimum Cuts for Palindrome'],
        timeComplexity: 'O(2^n × n) backtracking + O(n²) precompute',
        spaceComplexity: 'O(n²)',
        kotlinTemplate: `fun partition(s: String): List<List<String>> {
    val n = s.length
    val isPalin = Array(n) { BooleanArray(n) }
    // Precompute palindrome table
    for (i in n-1 downTo 0)
        for (j in i until n)
            isPalin[i][j] = s[i] == s[j] && (j - i < 2 || isPalin[i+1][j-1])

    val result = mutableListOf<List<String>>()

    fun backtrack(start: Int, current: MutableList<String>) {
        if (start == n) { result.add(current.toList()); return }
        for (end in start until n) {
            if (!isPalin[start][end]) continue
            current.add(s.substring(start, end + 1))
            backtrack(end + 1, current)
            current.removeAt(current.size - 1)
        }
    }

    backtrack(0, mutableListOf())
    return result
}`,
      },
    ],
  },
  {
    id: 'greedy',
    romanNumeral: 'VIII',
    title: 'Greedy Patterns',
    patterns: [
      {
        id: 'interval-merging-scheduling',
        number: 53,
        title: 'Interval Merging / Scheduling',
        description: 'Sort intervals by start time. Maintain the "current" merged interval. For each new interval, if it overlaps with the current, extend it; otherwise finalize the current and start a new one. For meeting rooms, sort by start and use a min-heap of end times.',
        keyInsight: 'Sorting by start time ensures you always encounter intervals in the order they begin — overlap detection then requires only comparing with the last merged interval.',
        useCases: ['Merge Intervals', 'Meeting Rooms II', 'Non-overlapping Intervals', 'Insert Interval'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun merge(intervals: Array<IntArray>): Array<IntArray> {
    intervals.sortBy { it[0] }
    val merged = mutableListOf<IntArray>()

    for (interval in intervals) {
        if (merged.isEmpty() || merged.last()[1] < interval[0]) {
            merged.add(interval)
        } else {
            merged.last()[1] = maxOf(merged.last()[1], interval[1])
        }
    }
    return merged.toTypedArray()
}

// Meeting rooms: min concurrent rooms needed
fun minMeetingRooms(intervals: Array<IntArray>): Int {
    intervals.sortBy { it[0] }
    val endTimes = PriorityQueue<Int>()  // min-heap
    for ((start, end) in intervals) {
        if (endTimes.isNotEmpty() && endTimes.peek() <= start) endTimes.poll()
        endTimes.offer(end)
    }
    return endTimes.size
}`,
      },
      {
        id: 'jump-game',
        number: 54,
        title: 'Jump Game Reachability / Minimization',
        description: 'Track the maximum reachable index as you scan left to right. At each position, update the furthest reachable index. If the current position exceeds the furthest reachable, the end is not reachable. For minimum jumps, greedily take the jump that reaches furthest.',
        keyInsight: 'You never need to try every jump length — just track the maximum reachable position. The greedy "furthest reach" is always optimal.',
        useCases: ['Jump Game', 'Jump Game II (min jumps)', 'Jump Game III', 'Video Stitching'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun canJump(nums: IntArray): Boolean {
    var maxReach = 0
    for (i in nums.indices) {
        if (i > maxReach) return false
        maxReach = maxOf(maxReach, i + nums[i])
    }
    return true
}

fun jump(nums: IntArray): Int {
    var jumps = 0; var curEnd = 0; var farthest = 0
    for (i in 0 until nums.size - 1) {
        farthest = maxOf(farthest, i + nums[i])
        if (i == curEnd) {     // must jump here
            jumps++; curEnd = farthest
        }
    }
    return jumps
}`,
      },
      {
        id: 'buy-sell-stock-greedy',
        number: 55,
        title: 'Buy/Sell Stock (Greedy)',
        description: 'For unlimited transactions, capture every upward price movement. For a single transaction, track the minimum price seen so far and compute the max profit at each step. The greedy insight is that any rising segment contributes positively.',
        keyInsight: 'For unlimited transactions: profit = sum of all positive day-over-day differences. You profit from every upward move.',
        useCases: ['Best Time to Buy Stock I, II', 'Maximum Profit with Fees', 'Greedy profit capture'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Single transaction
fun maxProfitOnce(prices: IntArray): Int {
    var minPrice = Int.MAX_VALUE; var maxProfit = 0
    for (price in prices) {
        minPrice = minOf(minPrice, price)
        maxProfit = maxOf(maxProfit, price - minPrice)
    }
    return maxProfit
}

// Unlimited transactions: capture every upswing
fun maxProfitUnlimited(prices: IntArray): Int {
    var profit = 0
    for (i in 1 until prices.size) {
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1]
    }
    return profit
}`,
      },
      {
        id: 'gas-station',
        number: 56,
        title: 'Gas Station Circuit',
        description: 'At each station, compute net = gas - cost. If the total net is non-negative, a solution exists. The starting station is the one after the point where cumulative net becomes most negative (or where it first goes negative).',
        keyInsight: 'If you can\'t complete the journey starting from station i, no station between i and the failure point can be the start — skip them all.',
        useCases: ['Gas Station', 'Circular Route Feasibility'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
    var totalNet = 0; var curNet = 0; var start = 0

    for (i in gas.indices) {
        val net = gas[i] - cost[i]
        totalNet += net
        curNet += net
        if (curNet < 0) {   // can't reach from current start
            start = i + 1
            curNet = 0
        }
    }
    return if (totalNet >= 0) start else -1
}`,
      },
      {
        id: 'task-scheduling-greedy',
        number: 57,
        title: 'Task Scheduling',
        description: 'Process tasks with deadlines or cooldowns using greedy ordering. For cooldown problems, always execute the highest-frequency available task. For deadline scheduling, sort by deadline and greedily assign tasks — backtrack if a deadline is missed.',
        keyInsight: 'Always do the most urgent or highest-frequency task that is currently available — this locally optimal choice is globally optimal for many scheduling objectives.',
        useCases: ['Task Scheduler', 'Reorganize String', 'Scheduling with Deadlines', 'Minimum Idle Time'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1) to O(n)',
        kotlinTemplate: `// Reorganize string: no two adjacent chars the same
fun reorganizeString(s: String): String {
    val freq = IntArray(26)
    for (c in s) freq[c - 'a']++

    val maxHeap = PriorityQueue<Int>(compareByDescending { freq[it] })
    for (i in freq.indices) if (freq[i] > 0) maxHeap.offer(i)

    val sb = StringBuilder()
    while (maxHeap.size >= 2) {
        val a = maxHeap.poll(); val b = maxHeap.poll()
        sb.append('a' + a); sb.append('a' + b)
        freq[a]--; freq[b]--
        if (freq[a] > 0) maxHeap.offer(a)
        if (freq[b] > 0) maxHeap.offer(b)
    }
    if (maxHeap.isNotEmpty()) {
        val last = maxHeap.poll()
        if (freq[last] > 1) return ""
        sb.append('a' + last)
    }
    return sb.toString()
}`,
      },
      {
        id: 'sorting-based-greedy',
        number: 58,
        title: 'Sorting Based Greedy',
        description: 'Sort the input by a key that makes the greedy choice obvious, then make locally optimal decisions in order. The sorted order guarantees that the greedy choice at each step doesn\'t violate future optimality.',
        keyInsight: 'The right sort order transforms a hard optimization problem into a simple scan — e.g., sort by end time for activity selection, by height for staircase problems.',
        useCases: ['Non-overlapping Intervals', 'Minimum Arrows to Burst Balloons', 'Two City Scheduling', 'Assign Cookies'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Minimum arrows to burst all balloons
fun findMinArrowShots(points: Array<IntArray>): Int {
    points.sortBy { it[1] }  // sort by end position
    var arrows = 1
    var arrowPos = points[0][1]

    for (i in 1 until points.size) {
        if (points[i][0] > arrowPos) {  // balloon not burst
            arrows++
            arrowPos = points[i][1]     // shoot at end of this balloon
        }
    }
    return arrows
}`,
      },
    ],
  },
  {
    id: 'binary-search',
    romanNumeral: 'IX',
    title: 'Binary Search Patterns',
    patterns: [
      {
        id: 'binary-search-sorted-array',
        number: 59,
        title: 'On Sorted Array/List',
        description: 'Classic binary search: maintain [left, right] bounds. Compute mid = left + (right - left) / 2 (overflow-safe). Compare mid element to target and halve the search space. The loop invariant is that the answer (if it exists) is always within [left, right].',
        keyInsight: 'Use left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow when indices are large.',
        useCases: ['Binary Search', 'Search in Rotated Sorted Array', 'Search a 2D Matrix', 'Find Peak Element'],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun search(nums: IntArray, target: Int): Int {
    var left = 0; var right = nums.size - 1

    while (left <= right) {
        val mid = left + (right - left) / 2
        when {
            nums[mid] == target -> return mid
            nums[mid] < target  -> left = mid + 1
            else                -> right = mid - 1
        }
    }
    return -1
}`,
      },
      {
        id: 'binary-search-rotated',
        number: 60,
        title: 'Find Min/Max in Rotated Sorted Array',
        description: 'At each midpoint, determine which half is sorted. The minimum must lie in the unsorted half (the part that "crosses" the rotation point). Narrow the search to that half. The key observation: if nums[mid] > nums[right], the left half is sorted and the min is in the right half.',
        keyInsight: 'One half is always sorted after rotation — identifying which half is sorted tells you exactly where the minimum (rotation point) can be.',
        useCases: ['Find Minimum in Rotated Sorted Array', 'Search in Rotated Sorted Array', 'Find Rotation Count'],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun findMin(nums: IntArray): Int {
    var left = 0; var right = nums.size - 1

    while (left < right) {
        val mid = left + (right - left) / 2
        if (nums[mid] > nums[right]) {
            left = mid + 1   // min is in right half
        } else {
            right = mid      // mid could be the min
        }
    }
    return nums[left]
}`,
      },
      {
        id: 'binary-search-on-answer',
        number: 61,
        title: 'On Answer / Condition Function',
        description: 'Binary search on the answer space (a range of values) rather than array indices. Define a monotonic predicate: "is value x feasible?". Find the boundary between feasible and infeasible values using binary search over [min_answer, max_answer].',
        keyInsight: 'If you can check "is the answer ≤ x?" in O(f(n)), binary search gives O(f(n) × log(answer_range)) total — often better than O(n²) or O(n³) brute force.',
        useCases: ['Koko Eating Bananas', 'Minimum Days to Make Bouquets', 'Capacity to Ship Packages', 'Split Array Largest Sum'],
        timeComplexity: 'O(n log (max_val))',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun minEatingSpeed(piles: IntArray, h: Int): Int {
    var left = 1; var right = piles.max()!!

    fun canFinish(speed: Int): Boolean {
        var hours = 0L
        for (pile in piles) hours += (pile + speed - 1) / speed
        return hours <= h
    }

    while (left < right) {
        val mid = left + (right - left) / 2
        if (canFinish(mid)) right = mid   // feasible, try smaller
        else left = mid + 1               // too slow, need faster
    }
    return left
}`,
      },
      {
        id: 'binary-search-first-last',
        number: 62,
        title: 'Find First/Last Occurrence',
        description: 'Run two binary searches: one to find the leftmost occurrence (bias right → left when match found) and one for the rightmost (bias left → right when match found). Alternatively, use one search with the appropriate bias.',
        keyInsight: 'To find the leftmost match, don\'t stop at the first match — record it and continue searching left. Mirror this logic for rightmost.',
        useCases: ['Find First and Last Position in Sorted Array', 'Count Occurrences of Element', 'Search for a Range'],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun searchRange(nums: IntArray, target: Int): IntArray {
    fun findLeft(): Int {
        var lo = 0; var hi = nums.size - 1; var idx = -1
        while (lo <= hi) {
            val mid = lo + (hi - lo) / 2
            if (nums[mid] == target) { idx = mid; hi = mid - 1 }  // go left
            else if (nums[mid] < target) lo = mid + 1
            else hi = mid - 1
        }
        return idx
    }

    fun findRight(): Int {
        var lo = 0; var hi = nums.size - 1; var idx = -1
        while (lo <= hi) {
            val mid = lo + (hi - lo) / 2
            if (nums[mid] == target) { idx = mid; lo = mid + 1 }  // go right
            else if (nums[mid] < target) lo = mid + 1
            else hi = mid - 1
        }
        return idx
    }

    return intArrayOf(findLeft(), findRight())
}`,
      },
      {
        id: 'median-kth-two-sorted-arrays',
        number: 63,
        title: 'Median / Kth Across Two Sorted Arrays',
        description: 'Binary search on the partition of the smaller array. For each partition of array A, deduce the matching partition of array B. The valid partition satisfies: maxLeft_A ≤ minRight_B and maxLeft_B ≤ minRight_A. The median is derived from the boundary elements.',
        keyInsight: 'Partitioning both arrays simultaneously (with the constraint that left total = right total) lets you binary search on just the smaller array\'s partition.',
        useCases: ['Median of Two Sorted Arrays', 'Kth Smallest in Two Sorted Arrays'],
        timeComplexity: 'O(log(min(m,n)))',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
    var (A, B) = if (nums1.size <= nums2.size) nums1 to nums2 else nums2 to nums1
    val total = A.size + B.size; val half = total / 2
    var lo = 0; var hi = A.size

    while (true) {
        val i = (lo + hi) / 2          // partition A
        val j = half - i               // partition B

        val maxLeftA  = if (i > 0)       A[i-1] else Int.MIN_VALUE
        val minRightA = if (i < A.size)  A[i]   else Int.MAX_VALUE
        val maxLeftB  = if (j > 0)       B[j-1] else Int.MIN_VALUE
        val minRightB = if (j < B.size)  B[j]   else Int.MAX_VALUE

        when {
            maxLeftA > minRightB -> hi = i - 1
            maxLeftB > minRightA -> lo = i + 1
            else -> return if (total % 2 == 0)
                (maxOf(maxLeftA, maxLeftB) + minOf(minRightA, minRightB)) / 2.0
            else minOf(minRightA, minRightB).toDouble()
        }
    }
}`,
      },
    ],
  },
  {
    id: 'stack',
    romanNumeral: 'X',
    title: 'Stack Patterns',
    patterns: [
      {
        id: 'valid-parentheses',
        number: 64,
        title: 'Valid Parentheses Matching',
        description: 'Push opening brackets onto the stack. For closing brackets, check that the stack is non-empty and the top matches. If it does, pop. At the end, the stack must be empty. Works for any number of bracket types.',
        keyInsight: 'The stack records the "expected" closing bracket for each unmatched opener — it enforces last-in-first-out matching order.',
        useCases: ['Valid Parentheses', 'Minimum Remove to Make Valid', 'Longest Valid Parentheses', 'Score of Parentheses'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun isValid(s: String): Boolean {
    val stack = ArrayDeque<Char>()
    val match = mapOf(')' to '(', '}' to '{', ']' to '[')

    for (c in s) {
        if (c in "({[") {
            stack.addLast(c)
        } else {
            if (stack.isEmpty() || stack.last() != match[c]) return false
            stack.removeLast()
        }
    }
    return stack.isEmpty()
}`,
      },
      {
        id: 'monotonic-stack',
        number: 65,
        title: 'Monotonic Stack',
        description: 'Maintain a stack in monotonically increasing or decreasing order. When a new element violates the order, pop elements until the invariant is restored — each popped element has found its "next greater/smaller" element. Used to find next greater/smaller elements in O(n).',
        keyInsight: 'Each element is pushed and popped at most once, giving O(n) total despite the nested while loop. When an element is popped, the current element is its "answer".',
        useCases: ['Daily Temperatures', 'Next Greater Element', 'Largest Rectangle in Histogram', 'Trapping Rain Water'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `// Next Greater Element: for each element, find first greater to the right
fun nextGreaterElement(nums: IntArray): IntArray {
    val result = IntArray(nums.size) { -1 }
    val stack = ArrayDeque<Int>()  // stores indices

    for (i in nums.indices) {
        // Pop all elements smaller than nums[i] — nums[i] is their next greater
        while (stack.isNotEmpty() && nums[stack.last()] < nums[i]) {
            result[stack.removeLast()] = nums[i]
        }
        stack.addLast(i)
    }
    return result
}

// Daily Temperatures
fun dailyTemperatures(temps: IntArray): IntArray {
    val result = IntArray(temps.size)
    val stack = ArrayDeque<Int>()
    for (i in temps.indices) {
        while (stack.isNotEmpty() && temps[stack.last()] < temps[i]) {
            val idx = stack.removeLast()
            result[idx] = i - idx
        }
        stack.addLast(i)
    }
    return result
}`,
      },
      {
        id: 'expression-evaluation',
        number: 66,
        title: 'Expression Evaluation',
        description: 'Use two stacks (numbers and operators) or convert to postfix (RPN). When encountering an operator with lower or equal precedence than the stack top, evaluate the top operator first. Handles +, -, *, /, and parentheses.',
        keyInsight: 'Evaluate higher-precedence operators immediately; defer lower-precedence operators to the stack. Parentheses create a precedence boundary — evaluate all operators until the matching open paren.',
        useCases: ['Basic Calculator I, II, III', 'Evaluate Reverse Polish Notation', 'Decode String'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun calculate(s: String): Int {
    val stack = ArrayDeque<Int>()
    var result = 0; var num = 0; var sign = 1

    for (c in s) {
        when {
            c.isDigit() -> num = num * 10 + (c - '0')
            c == '+' -> { result += sign * num; num = 0; sign = 1 }
            c == '-' -> { result += sign * num; num = 0; sign = -1 }
            c == '(' -> {
                stack.addLast(result)   // save current result
                stack.addLast(sign)     // save current sign
                result = 0; sign = 1
            }
            c == ')' -> {
                result += sign * num; num = 0
                result *= stack.removeLast()   // apply saved sign
                result += stack.removeLast()   // add saved result
            }
        }
    }
    return result + sign * num
}`,
      },
      {
        id: 'simulation-stack',
        number: 67,
        title: 'Simulation / Backtracking Helper',
        description: 'Use the stack as a scratch pad for simulations that need to "undo" or revisit recent operations. Examples: processing nested structures, tracking states before branches, or simulating a recursive process iteratively.',
        keyInsight: 'A stack naturally models recursion — each stack frame corresponds to a recursive call, and popping corresponds to returning from that call.',
        useCases: ['Decode String', 'Flatten Nested List Iterator', 'Ternary Expression Parser', 'Implement Queue using Stacks'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `// Decode String: "3[a2[c]]" -> "accaccacc"
fun decodeString(s: String): String {
    val countStack = ArrayDeque<Int>()
    val stringStack = ArrayDeque<String>()
    var currentStr = ""
    var currentNum = 0

    for (c in s) {
        when {
            c.isDigit() -> currentNum = currentNum * 10 + (c - '0')
            c == '['    -> {
                countStack.addLast(currentNum); currentNum = 0
                stringStack.addLast(currentStr); currentStr = ""
            }
            c == ']'    -> {
                val times = countStack.removeLast()
                val prev  = stringStack.removeLast()
                currentStr = prev + currentStr.repeat(times)
            }
            else        -> currentStr += c
        }
    }
    return currentStr
}`,
      },
      {
        id: 'min-stack',
        number: 68,
        title: 'Min Stack Design',
        description: 'Augment a regular stack to support O(1) getMin(). Use a parallel "min stack" that tracks the current minimum at each level. When pushing, also push the new minimum to the min stack. When popping, pop both stacks.',
        keyInsight: 'Store not just the global minimum, but the minimum at each stack depth — so that popping restores the previous minimum correctly.',
        useCases: ['Min Stack', 'Max Stack', 'Stack with Increment Operation'],
        timeComplexity: 'O(1) for all operations',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `class MinStack {
    private val stack    = ArrayDeque<Int>()
    private val minStack = ArrayDeque<Int>()

    fun push(value: Int) {
        stack.addLast(value)
        val currentMin = if (minStack.isEmpty()) value else minOf(minStack.last(), value)
        minStack.addLast(currentMin)
    }

    fun pop() {
        stack.removeLast()
        minStack.removeLast()
    }

    fun top(): Int = stack.last()
    fun getMin(): Int = minStack.last()
}`,
      },
      {
        id: 'largest-rectangle-histogram',
        number: 69,
        title: 'Largest Rectangle in Histogram',
        description: 'Use a monotonic stack of bar indices in increasing height order. When a shorter bar is encountered, pop bars from the stack — each popped bar forms a rectangle spanning from the new stack top to the current index. The width is determined by these boundaries.',
        keyInsight: 'A bar can extend left until it finds a shorter bar, and extend right until it finds a shorter bar — the stack tracks exactly those left boundaries.',
        useCases: ['Largest Rectangle in Histogram', 'Maximal Rectangle (2D)', 'Maximum Width Ramp'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun largestRectangleArea(heights: IntArray): Int {
    val stack = ArrayDeque<Int>()  // indices, increasing heights
    var maxArea = 0
    val n = heights.size

    for (i in 0..n) {
        val h = if (i == n) 0 else heights[i]
        while (stack.isNotEmpty() && heights[stack.last()] > h) {
            val height = heights[stack.removeLast()]
            val width  = if (stack.isEmpty()) i else i - stack.last() - 1
            maxArea = maxOf(maxArea, height * width)
        }
        stack.addLast(i)
    }
    return maxArea
}`,
      },
    ],
  },
  {
    id: 'bit-manipulation',
    romanNumeral: 'XI',
    title: 'Bit Manipulation Patterns',
    patterns: [
      {
        id: 'xor-single-missing-number',
        number: 70,
        title: 'Bitwise XOR — Finding Single/Missing Number',
        description: 'XOR is its own inverse: a ^ a = 0 and a ^ 0 = a. XOR all elements and all expected values — duplicates cancel, leaving only the unique element. Used to find the single non-duplicate number in O(1) space.',
        keyInsight: 'XOR cancels paired values — any number appearing an even number of times contributes 0, leaving only the odd-occurring values.',
        useCases: ['Single Number', 'Missing Number', 'Find Two Single Numbers (XOR + partition)', 'Single Number III'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Single number in array where all others appear twice
fun singleNumber(nums: IntArray): Int {
    var xor = 0
    for (num in nums) xor = xor xor num
    return xor
}

// Missing number in [0..n]
fun missingNumber(nums: IntArray): Int {
    var xor = nums.size
    for (i in nums.indices) xor = xor xor i xor nums[i]
    return xor
}

// Find two unique numbers (all others appear twice)
fun singleNumberIII(nums: IntArray): IntArray {
    val xorAll = nums.fold(0) { acc, n -> acc xor n }
    val diff = xorAll and (-xorAll)          // lowest set bit: differs between the two
    var a = 0
    for (num in nums) if (num and diff != 0) a = a xor num
    return intArrayOf(a, xorAll xor a)
}`,
      },
      {
        id: 'count-set-bits',
        number: 71,
        title: 'Bitwise AND — Counting Set Bits (Hamming Weight)',
        description: "Count the number of 1 bits in an integer. The trick n & (n-1) removes the lowest set bit — repeat until n is 0, counting iterations. Alternatively, Brian Kernighan's algorithm counts in O(set bits) instead of O(32).",
        keyInsight: 'n & (n-1) clears the lowest set bit of n — repeating this exactly (number of set bits) times reaches 0.',
        useCases: ['Number of 1 Bits', 'Hamming Distance', 'Total Hamming Distance', 'Reverse Bits'],
        timeComplexity: 'O(k) where k = number of set bits',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Brian Kernighan's algorithm
fun hammingWeight(n: Int): Int {
    var count = 0; var num = n
    while (num != 0) {
        num = num and (num - 1)  // clear lowest set bit
        count++
    }
    return count
}

// Hamming distance between two numbers
fun hammingDistance(x: Int, y: Int): Int = hammingWeight(x xor y)

// Reverse bits
fun reverseBits(n: Int): Int {
    var result = 0; var num = n
    repeat(32) {
        result = (result shl 1) or (num and 1)
        num = num ushr 1
    }
    return result
}`,
      },
      {
        id: 'bitwise-dp-counting',
        number: 72,
        title: 'Bitwise DP — Counting Bits Optimization',
        description: 'dp[i] = number of 1 bits in i. Use the relation: dp[i] = dp[i >> 1] + (i & 1). The right shift removes the last bit (already counted in dp[i/2]); the & 1 adds the last bit. Computes all values 0 to n in O(n) with O(n) space.',
        keyInsight: 'The bit count of i equals the bit count of i/2 plus the value of i\'s last bit — this recurrence enables DP over bit patterns.',
        useCases: ['Counting Bits', 'Sum of All Subset XOR Totals', 'DP over bitmask states (TSP, etc.)'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun countBits(n: Int): IntArray {
    val dp = IntArray(n + 1)
    for (i in 1..n) {
        dp[i] = dp[i shr 1] + (i and 1)
    }
    return dp
}

// Bitmask DP template (e.g., TSP / minimum cost to visit all nodes)
fun tspDP(cost: Array<IntArray>): Int {
    val n = cost.size
    val FULL = (1 shl n) - 1
    val dp = Array(1 shl n) { IntArray(n) { Int.MAX_VALUE / 2 } }
    dp[1][0] = 0

    for (mask in 1..FULL) {
        for (u in 0 until n) {
            if (dp[mask][u] == Int.MAX_VALUE / 2) continue
            if (mask and (1 shl u) == 0) continue
            for (v in 0 until n) {
                if (mask and (1 shl v) != 0) continue
                val newMask = mask or (1 shl v)
                dp[newMask][v] = minOf(dp[newMask][v], dp[mask][u] + cost[u][v])
            }
        }
    }
    return dp[FULL].min()!!
}`,
      },
      {
        id: 'power-of-two-check',
        number: 73,
        title: 'Bitwise Operations — Power of Two/Four Check',
        description: 'A power of 2 has exactly one set bit: n > 0 && (n & (n-1)) == 0. A power of 4 is a power of 2 where the set bit is in an even position: additionally check n & 0xAAAAAAAA == 0. Bit tricks give O(1) solutions to otherwise O(log n) problems.',
        keyInsight: 'Powers of 2 are the only positive integers where n & (n-1) == 0 — flipping the single set bit clears all bits.',
        useCases: ['Power of Two', 'Power of Three', 'Power of Four', 'Bitwise AND of Numbers Range'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun isPowerOfTwo(n: Int): Boolean = n > 0 && (n and (n - 1)) == 0

fun isPowerOfFour(n: Int): Boolean {
    // Power of 2 AND the single set bit is at an even position (0, 2, 4...)
    // 0x55555555 = ...01010101 in binary (even positions set)
    return n > 0 && (n and (n - 1)) == 0 && (n and 0x55555555) != 0
}

// Bitwise AND of a range [m, n]: find common prefix
fun rangeBitwiseAnd(left: Int, right: Int): Int {
    var shift = 0
    var l = left; var r = right
    while (l != r) { l = l shr 1; r = r shr 1; shift++ }
    return l shl shift
}`,
      },
    ],
  },
  {
    id: 'linked-list',
    romanNumeral: 'XII',
    title: 'Linked List Manipulation Patterns',
    patterns: [
      {
        id: 'in-place-reversal-linked-list',
        number: 74,
        title: 'In-place Reversal',
        description: 'Reverse a linked list (or a segment) using three pointers: prev, curr, next. At each step: save next, point curr to prev, advance prev to curr, advance curr to saved next. For partial reversal, identify the segment boundaries first.',
        keyInsight: 'The key is saving curr.next before overwriting curr.next = prev — without this save you lose the rest of the list.',
        useCases: ['Reverse Linked List', 'Reverse Linked List II', 'Reverse Nodes in k-Group', 'Palindrome Linked List'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun reverseList(head: ListNode?): ListNode? {
    var prev: ListNode? = null
    var curr = head

    while (curr != null) {
        val next = curr.next  // save
        curr.next = prev       // reverse
        prev = curr            // advance prev
        curr = next            // advance curr
    }
    return prev
}

// Reverse segment [left, right]
fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
    val dummy = ListNode(0); dummy.next = head
    var pre: ListNode? = dummy
    repeat(left - 1) { pre = pre?.next }

    var curr = pre?.next
    repeat(right - left) {
        val next = curr?.next
        curr?.next = next?.next
        next?.next = pre?.next
        pre?.next = next
    }
    return dummy.next
}`,
      },
      {
        id: 'merging-sorted-lists',
        number: 75,
        title: 'Merging Two Sorted Lists',
        description: 'Use a dummy head node to simplify edge cases. Compare the heads of both lists and attach the smaller one to the result. Advance only the pointer from the list whose head was consumed. Append the remaining non-empty list at the end.',
        keyInsight: 'A dummy head eliminates the special case of the result list being empty — you always append to dummy.next.',
        useCases: ['Merge Two Sorted Lists', 'Merge K Sorted Lists', 'Sort List (merge sort)'],
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
    val dummy = ListNode(0)
    var curr = dummy
    var l1 = list1; var l2 = list2

    while (l1 != null && l2 != null) {
        if (l1.value <= l2.value) {
            curr.next = l1; l1 = l1.next
        } else {
            curr.next = l2; l2 = l2.next
        }
        curr = curr.next!!
    }
    curr.next = l1 ?: l2   // attach remaining list
    return dummy.next
}`,
      },
      {
        id: 'addition-of-numbers',
        number: 76,
        title: 'Addition of Numbers',
        description: 'Simulate grade-school addition on two linked lists representing numbers (digits stored in forward or reverse order). Track a carry variable. If lists have different lengths, treat missing digits as 0. Create a new node for each digit sum.',
        keyInsight: 'Process both lists simultaneously with a carry — the loop continues as long as either list has nodes or there is a remaining carry.',
        useCases: ['Add Two Numbers (reversed)', 'Add Two Numbers II (forward)', 'Plus One Linked List'],
        timeComplexity: 'O(max(m,n))',
        spaceComplexity: 'O(max(m,n))',
        kotlinTemplate: `fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
    val dummy = ListNode(0); var curr = dummy
    var carry = 0
    var a = l1; var b = l2

    while (a != null || b != null || carry != 0) {
        val sum = (a?.value ?: 0) + (b?.value ?: 0) + carry
        carry = sum / 10
        curr.next = ListNode(sum % 10)
        curr = curr.next!!
        a = a?.next; b = b?.next
    }
    return dummy.next
}`,
      },
      {
        id: 'intersection-detection',
        number: 77,
        title: 'Intersection Detection',
        description: 'To find the intersection node of two lists without extra space: advance both pointers. When one reaches the end, redirect it to the head of the other list. When both have traveled (A + B) total steps they are at the same position — either the intersection or null.',
        keyInsight: 'Both pointers travel the same total distance (len_A + len_B) — they must meet at the intersection node or at null simultaneously.',
        useCases: ['Intersection of Two Linked Lists', 'Linked List Cycle (start of cycle)', 'Find Common Node'],
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun getIntersectionNode(headA: ListNode?, headB: ListNode?): ListNode? {
    var a = headA; var b = headB

    // Each pointer traverses A+B total length
    while (a !== b) {
        a = if (a == null) headB else a.next
        b = if (b == null) headA else b.next
    }
    return a  // either intersection node or null
}`,
      },
      {
        id: 'reordering-partitioning',
        number: 78,
        title: 'Reordering / Partitioning',
        description: 'Rearrange linked list nodes according to a rule: odd/even grouping, partition around a value, or interleaving. Use multiple dummy heads to collect nodes into sub-lists, then reconnect at the end. The dummy head trick keeps code clean.',
        keyInsight: 'Separate nodes into multiple lists based on the partition rule, then link the tails of each sub-list together — no swapping required.',
        useCases: ['Odd Even Linked List', 'Partition List', 'Reorder List (L0→Ln→L1→Ln-1...)'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Odd-Even Linked List: all odd-indexed nodes first, then even
fun oddEvenList(head: ListNode?): ListNode? {
    val oddDummy  = ListNode(0); val evenDummy = ListNode(0)
    var odd = oddDummy; var even = evenDummy
    var curr = head; var isOdd = true

    while (curr != null) {
        if (isOdd) { odd.next = curr; odd = odd.next!! }
        else       { even.next = curr; even = even.next!! }
        curr = curr.next; isOdd = !isOdd
    }
    even.next = null           // terminate even list
    odd.next = evenDummy.next  // connect odd -> even
    return oddDummy.next
}`,
      },
    ],
  },
  {
    id: 'array-matrix',
    romanNumeral: 'XIII',
    title: 'Array/Matrix Manipulation Patterns',
    patterns: [
      {
        id: 'in-place-rotation',
        number: 79,
        title: 'In-place Rotation',
        description: 'Rotate a matrix 90° clockwise in-place using two steps: transpose (swap matrix[i][j] with matrix[j][i]) then reverse each row. For counter-clockwise: transpose then reverse each column. No extra space needed.',
        keyInsight: 'Rotation = transpose + reflection. These two O(n²) operations together achieve rotation without extra memory.',
        useCases: ['Rotate Image', 'Rotate Array', 'Rotate Matrix 90/180/270'],
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun rotate(matrix: Array<IntArray>) {
    val n = matrix.size

    // Step 1: Transpose (flip along main diagonal)
    for (i in 0 until n)
        for (j in i + 1 until n) {
            val tmp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = tmp
        }

    // Step 2: Reverse each row
    for (row in matrix) {
        var l = 0; var r = row.size - 1
        while (l < r) { val tmp = row[l]; row[l] = row[r]; row[r] = tmp; l++; r-- }
    }
}`,
      },
      {
        id: 'spiral-traversal',
        number: 80,
        title: 'Spiral Traversal',
        description: 'Maintain four boundaries: top, bottom, left, right. Traverse right along top row, down along right column, left along bottom row, up along left column — shrink boundaries after each traversal. Stop when boundaries cross.',
        keyInsight: 'After each directional pass, shrink the corresponding boundary — the four-boundary approach handles all matrix shapes including non-square.',
        useCases: ['Spiral Matrix', 'Spiral Matrix II', 'Generate Spiral Order'],
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(1) extra',
        kotlinTemplate: `fun spiralOrder(matrix: Array<IntArray>): List<Int> {
    val result = mutableListOf<Int>()
    var top = 0; var bottom = matrix.size - 1
    var left = 0; var right = matrix[0].size - 1

    while (top <= bottom && left <= right) {
        for (c in left..right) result.add(matrix[top][c]);   top++
        for (r in top..bottom) result.add(matrix[r][right]); right--
        if (top <= bottom)
            for (c in right downTo left) result.add(matrix[bottom][c]); bottom--
        if (left <= right)
            for (r in bottom downTo top) result.add(matrix[r][left]);   left++
    }
    return result
}`,
      },
      {
        id: 'in-place-marking',
        number: 81,
        title: 'In-place Marking',
        description: 'Use values within the existing array to encode visited state without extra space. Common tricks: negate the value at index nums[i]-1 (for positive arrays), or set to a sentinel value. Careful to preserve information needed for later steps.',
        keyInsight: 'When values are bounded (e.g., 1 to n), you can encode "visited" by negating the element at the index corresponding to that value.',
        useCases: ['Find All Duplicates', 'Find the Duplicate Number', 'Set Matrix Zeroes', 'First Missing Positive'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Find all duplicates in [1..n] array without extra space
fun findDuplicates(nums: IntArray): List<Int> {
    val result = mutableListOf<Int>()
    for (num in nums) {
        val idx = Math.abs(num) - 1
        if (nums[idx] < 0) result.add(Math.abs(num))  // already visited
        else nums[idx] = -nums[idx]                    // mark as visited
    }
    return result
}

// Set Matrix Zeroes: use first row/col as flags
fun setZeroes(matrix: Array<IntArray>) {
    val firstRowZero  = matrix[0].any { it == 0 }
    val firstColZero  = matrix.any { it[0] == 0 }
    for (i in 1 until matrix.size)
        for (j in 1 until matrix[0].size)
            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0 }
    for (i in 1 until matrix.size)
        for (j in 1 until matrix[0].size)
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0
    if (firstRowZero) matrix[0].fill(0)
    if (firstColZero) for (i in matrix.indices) matrix[i][0] = 0
}`,
      },
      {
        id: 'prefix-suffix-products',
        number: 82,
        title: 'Prefix/Suffix Products',
        description: 'Compute prefix products (product of all elements to the left) and suffix products (product of all elements to the right). The result at each index is prefix[i] × suffix[i]. Can be done in O(n) with O(1) extra space by computing one pass, then updating in-place with the other.',
        keyInsight: 'The product of all elements except self = (product of all to the left) × (product of all to the right). No division needed.',
        useCases: ['Product of Array Except Self', 'Trapping Rain Water (prefix max + suffix max)', 'Sum of Subarray Minimums'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) extra (output array not counted)',
        kotlinTemplate: `fun productExceptSelf(nums: IntArray): IntArray {
    val n = nums.size
    val result = IntArray(n)

    // First pass: prefix products
    result[0] = 1
    for (i in 1 until n) result[i] = result[i-1] * nums[i-1]

    // Second pass: multiply by suffix products on-the-fly
    var suffix = 1
    for (i in n-1 downTo 0) {
        result[i] *= suffix
        suffix *= nums[i]
    }
    return result
}`,
      },
      {
        id: 'plus-one',
        number: 83,
        title: 'Plus One',
        description: 'Simulate addition by 1 from the least significant digit. Process digits right to left: if digit < 9, increment and return. If digit == 9, set to 0 and carry over to the next digit. If all digits were 9, prepend a 1.',
        keyInsight: 'The carry propagates left only through 9s — once you hit a non-9 digit, increment it and stop. Only all-9s input needs a new leading digit.',
        useCases: ['Plus One', 'Add to Array-Form of Integer', 'Multiply Strings'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) or O(n) for all-9s case',
        kotlinTemplate: `fun plusOne(digits: IntArray): IntArray {
    for (i in digits.indices.reversed()) {
        if (digits[i] < 9) {
            digits[i]++
            return digits
        }
        digits[i] = 0  // carry
    }
    // All digits were 9 -> prepend 1
    val result = IntArray(digits.size + 1)
    result[0] = 1
    return result
}`,
      },
      {
        id: 'in-place-from-end',
        number: 84,
        title: 'In-place from End',
        description: 'When merging or modifying arrays in-place, process from the end to avoid overwriting values you still need. Common in merge operations where the destination is the larger array itself (merge sorted arrays, string expansion in-place).',
        keyInsight: 'Writing from the back into free space (or the larger array) guarantees you never overwrite an unread element.',
        useCases: ['Merge Sorted Array', 'String Replacement In-place', 'Trapping Rain Water'],
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `// Merge nums2 into nums1 (nums1 has enough space at end)
fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
    var i = m - 1      // pointer in nums1 valid portion
    var j = n - 1      // pointer in nums2
    var k = m + n - 1  // pointer at the end of nums1

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) { nums1[k--] = nums1[i--] }
        else                     { nums1[k--] = nums2[j--] }
    }
    // Copy remaining nums2 elements (nums1 elements are already in place)
    while (j >= 0) nums1[k--] = nums2[j--]
}`,
      },
      {
        id: 'cyclic-sort',
        number: 85,
        title: 'Cyclic Sort',
        description: 'When elements are in the range [1, n] (or [0, n-1]), each element has a known correct index. Traverse the array and swap each element to its correct position. After sorting, elements out of place indicate missing/duplicate numbers.',
        keyInsight: 'nums[i] should be at index nums[i]-1. If it\'s not, swap it there. Do not advance i until the element at i is in its correct position.',
        useCases: ['Find Missing Number', 'Find All Missing Numbers', 'Find Duplicate Number', 'First Missing Positive'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun findMissingNumbers(nums: IntArray): List<Int> {
    // Cyclic sort: place each number at its correct index
    var i = 0
    while (i < nums.size) {
        val correct = nums[i] - 1
        if (nums[i] in 1..nums.size && nums[i] != nums[correct]) {
            val tmp = nums[i]; nums[i] = nums[correct]; nums[correct] = tmp
        } else {
            i++
        }
    }

    // Find positions where value != index+1
    return nums.indices.filter { nums[it] != it + 1 }.map { it + 1 }
}`,
      },
    ],
  },
  {
    id: 'string-manipulation',
    romanNumeral: 'XIV',
    title: 'String Manipulation Patterns',
    patterns: [
      {
        id: 'palindrome-check',
        number: 86,
        title: 'Palindrome Check',
        description: 'Use two pointers (left and right) converging from both ends, skipping invalid characters as needed. For substring palindromes, expand from each center. For DP-based approaches, use a 2D table to check any substring in O(1).',
        keyInsight: 'A string is a palindrome if and only if s[i] == s[n-1-i] for all valid i — check pairs from the outside in.',
        useCases: ['Valid Palindrome', 'Palindromic Substrings', 'Longest Palindromic Substring', 'Palindrome Pairs'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun isPalindrome(s: String): Boolean {
    var l = 0; var r = s.length - 1
    while (l < r) {
        while (l < r && !s[l].isLetterOrDigit()) l++
        while (l < r && !s[r].isLetterOrDigit()) r--
        if (s[l].lowercaseChar() != s[r].lowercaseChar()) return false
        l++; r--
    }
    return true
}

fun countPalindromicSubstrings(s: String): Int {
    var count = 0
    fun expand(l: Int, r: Int) {
        var a = l; var b = r
        while (a >= 0 && b < s.length && s[a] == s[b]) { count++; a--; b++ }
    }
    for (i in s.indices) { expand(i, i); expand(i, i + 1) }
    return count
}`,
      },
      {
        id: 'anagram-check',
        number: 87,
        title: 'Anagram Check',
        description: 'Count character frequencies using a fixed-size array (size 26 for lowercase ASCII). Increment for the first string, decrement for the second. Two strings are anagrams if all counts are 0 after processing. Works in O(n) with O(1) space.',
        keyInsight: 'Anagrams are strings with identical character multisets — a single frequency array with +1/-1 operations detects this in one pass.',
        useCases: ['Valid Anagram', 'Group Anagrams', 'Find All Anagrams in String', 'Ransom Note'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) — fixed alphabet size',
        kotlinTemplate: `fun isAnagram(s: String, t: String): Boolean {
    if (s.length != t.length) return false
    val count = IntArray(26)
    for (i in s.indices) {
        count[s[i] - 'a']++
        count[t[i] - 'a']--
    }
    return count.all { it == 0 }
}

fun groupAnagrams(strs: Array<String>): List<List<String>> {
    val map = HashMap<String, MutableList<String>>()
    for (s in strs) {
        val key = s.toCharArray().sorted().joinToString("")
        map.getOrPut(key) { mutableListOf() }.add(s)
    }
    return map.values.toList()
}`,
      },
      {
        id: 'roman-to-integer',
        number: 88,
        title: 'Roman to Integer Conversion',
        description: 'Map each Roman numeral to its value. Scan left to right: if the current symbol\'s value is less than the next, subtract it (subtractive notation: IV = 4, IX = 9); otherwise add it. One pass handles both additive and subtractive cases.',
        keyInsight: 'In Roman numerals, subtraction occurs when a smaller value precedes a larger one — comparing the current and next character handles all cases.',
        useCases: ['Roman to Integer', 'Integer to Roman', 'Validate Roman Numeral'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun romanToInt(s: String): Int {
    val map = mapOf('I' to 1, 'V' to 5, 'X' to 10, 'L' to 50,
                    'C' to 100, 'D' to 500, 'M' to 1000)
    var result = 0
    for (i in s.indices) {
        val curr = map[s[i]]!!
        val next = if (i + 1 < s.length) map[s[i+1]]!! else 0
        result += if (curr < next) -curr else curr
    }
    return result
}`,
      },
      {
        id: 'string-to-integer-atoi',
        number: 89,
        title: 'String to Integer (atoi)',
        description: 'Simulate the atoi function: skip leading whitespace, read optional sign, read digits, stop at first non-digit, and clamp to INT_MIN/INT_MAX on overflow. Handle edge cases explicitly rather than relying on language facilities.',
        keyInsight: 'Check for overflow before multiplying: if the accumulator exceeds INT_MAX/10 (or equals INT_MAX/10 with a digit > 7), clamp immediately.',
        useCases: ['String to Integer (atoi)', 'Valid Number', 'Interpret Integer Input'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        kotlinTemplate: `fun myAtoi(s: String): Int {
    var i = 0; val n = s.length
    // 1. Skip whitespace
    while (i < n && s[i] == ' ') i++
    if (i == n) return 0

    // 2. Read sign
    val sign = if (s[i] == '-') { i++; -1 } else { if (s[i] == '+') i++; 1 }

    // 3. Read digits with overflow check
    var result = 0L
    while (i < n && s[i].isDigit()) {
        result = result * 10 + (s[i] - '0')
        if (result * sign > Int.MAX_VALUE) return Int.MAX_VALUE
        if (result * sign < Int.MIN_VALUE) return Int.MIN_VALUE
        i++
    }
    return (result * sign).toInt()
}`,
      },
      {
        id: 'manual-simulation',
        number: 90,
        title: 'Manual Simulation',
        description: 'Simulate the described process step by step, maintaining the required state. No clever trick is needed — careful implementation of the specification handles correctness. Common in string formatting, game simulation, and custom encoding problems.',
        keyInsight: 'Break the simulation into clear steps; handle edge cases (empty input, single character, boundaries) explicitly before the main loop.',
        useCases: ['Count and Say', 'Zigzag Conversion', 'Multiply Strings', 'Implement strStr()'],
        timeComplexity: 'Varies by problem',
        spaceComplexity: 'Varies by problem',
        kotlinTemplate: `// Count and Say
fun countAndSay(n: Int): String {
    var result = "1"
    repeat(n - 1) {
        val sb = StringBuilder()
        var i = 0
        while (i < result.length) {
            val c = result[i]; var count = 0
            while (i < result.length && result[i] == c) { count++; i++ }
            sb.append(count).append(c)
        }
        result = sb.toString()
    }
    return result
}

// Zigzag conversion
fun convert(s: String, numRows: Int): String {
    if (numRows == 1) return s
    val rows = Array(numRows) { StringBuilder() }
    var row = 0; var dir = -1
    for (c in s) {
        rows[row].append(c)
        if (row == 0 || row == numRows - 1) dir = -dir
        row += dir
    }
    return rows.joinToString("")
}`,
      },
      {
        id: 'string-matching-kmp',
        number: 91,
        title: 'String Matching — Naive / KMP / Rabin-Karp',
        description: 'Naive: O(n×m) with nested loops. KMP: precompute a failure function (LPS array) to skip redundant comparisons, achieving O(n+m). Rabin-Karp: use rolling hash to check pattern in O(1) per window, O(n+m) average.',
        keyInsight: 'KMP\'s LPS (Longest Proper Prefix which is also Suffix) array encodes how far to backtrack on mismatch — never revisit text characters.',
        useCases: ['Find Needle in Haystack', 'Repeated Substring Pattern', 'Shortest Palindrome', 'String Contains Pattern'],
        timeComplexity: 'O(n + m) for KMP',
        spaceComplexity: 'O(m) for LPS array',
        kotlinTemplate: `// KMP string search
fun kmpSearch(text: String, pattern: String): Int {
    val m = pattern.length
    if (m == 0) return 0

    // Build LPS (failure function)
    val lps = IntArray(m)
    var len = 0; var i = 1
    while (i < m) {
        if (pattern[i] == pattern[len]) { lps[i++] = ++len }
        else if (len > 0) len = lps[len - 1]
        else lps[i++] = 0
    }

    // Search
    var j = 0
    for (k in text.indices) {
        while (j > 0 && text[k] != pattern[j]) j = lps[j - 1]
        if (text[k] == pattern[j]) j++
        if (j == m) return k - m + 1  // found
    }
    return -1
}`,
      },
      {
        id: 'repeated-substring-pattern',
        number: 92,
        title: 'Repeated Substring Pattern Detection',
        description: 'Check whether a string can be formed by repeating a smaller substring. The trick: concatenate the string with itself (s + s), remove the first and last characters, and check if the original string appears as a substring. If it does, it has a repeated pattern.',
        keyInsight: 'If s = k repetitions of p, then in (s+s)[1..-2], the original s appears starting at position (|p|-1). Removing the boundaries prevents matching at position 0 and |s|.',
        useCases: ['Repeated Substring Pattern', 'Circular String Detection', 'KMP Suffix Check'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        kotlinTemplate: `fun repeatedSubstringPattern(s: String): Boolean {
    // Trick: if s has a repeated pattern, it appears in (s+s)[1..-2]
    val doubled = (s + s).substring(1, 2 * s.length - 1)
    return doubled.contains(s)
}

// Alternative: try all divisor lengths
fun repeatedSubstringPatternBrute(s: String): Boolean {
    val n = s.length
    for (len in 1..n / 2) {
        if (n % len != 0) continue
        val pattern = s.substring(0, len)
        if (pattern.repeat(n / len) == s) return true
    }
    return false
}`,
      },
    ],
  },
  {
    id: 'design-patterns',
    romanNumeral: 'XV',
    title: 'Design Patterns',
    patterns: [
      {
        id: 'system-design-general',
        number: 93,
        title: 'General System Design',
        description: 'Approach system design interviews with a structured framework: clarify requirements (functional + non-functional), estimate scale (QPS, storage), define the API, design the data model and schema, draw the high-level architecture, then deep-dive into bottlenecks and trade-offs.',
        keyInsight: 'Start with requirements before drawing boxes — the right architecture is impossible to choose without knowing the scale, consistency, and latency requirements.',
        useCases: ['Design URL Shortener', 'Design Twitter/Feed', 'Design Rate Limiter', 'Design Distributed Cache'],
        timeComplexity: 'N/A — design problem',
        spaceComplexity: 'N/A — design problem',
        kotlinTemplate: `/*
System Design Framework:

1. CLARIFY (5 min)
   - Who uses it? Read-heavy or write-heavy?
   - Scale: DAU, QPS, data size, latency SLA
   - Consistency needs: strong vs eventual?

2. API DESIGN
   POST /shorten  { url }  -> { shortCode }
   GET  /:code            -> 301 redirect

3. DATA MODEL
   UrlMapping { id, shortCode, longUrl, userId, createdAt }
   User       { id, email, ... }

4. HIGH-LEVEL ARCHITECTURE
   Client -> Load Balancer -> App Servers -> Cache (Redis) -> DB

5. DEEP DIVES
   - ID generation: auto-increment vs UUID vs Snowflake
   - Short code: base62(id) -> 7 chars = 62^7 URLs
   - Cache: Redis for hot URLs (80/20 rule)
   - DB: MySQL for writes, read replicas for reads
   - CDN: serve redirects from edge for latency

6. BOTTLENECKS & TRADE-OFFS
   - Thundering herd on cache miss
   - Hot partitions in DB (shard by shortCode hash)
   - Expiry policy (TTL in Redis and DB)
*/

// Base62 encoder for ID -> short code
fun toBase62(id: Long): String {
    val chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    val sb = StringBuilder()
    var n = id
    while (n > 0) { sb.append(chars[(n % 62).toInt()]); n /= 62 }
    return sb.reverse().toString().padStart(7, '0')
}`,
      },
      {
        id: 'trie',
        number: 94,
        title: 'Tries (Prefix Trees)',
        description: 'A trie is a tree where each node represents a character. Each root-to-node path spells a prefix. Insert and search run in O(L) where L is word length, independent of the number of words stored. Each node stores children (array or map) and an "end of word" flag.',
        keyInsight: 'Tries excel at prefix operations — "does any word start with this prefix?" is O(prefix_length), which a hash set cannot do efficiently.',
        useCases: ['Implement Trie', 'Word Search II', 'Replace Words with Root', 'Design Add and Search Words'],
        timeComplexity: 'O(L) insert/search where L = word length',
        spaceComplexity: 'O(ALPHABET_SIZE × N × L)',
        kotlinTemplate: `class TrieNode {
    val children = arrayOfNulls<TrieNode>(26)
    var isEnd = false
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
        var node = root
        for (c in word) {
            val idx = c - 'a'
            if (node.children[idx] == null) node.children[idx] = TrieNode()
            node = node.children[idx]!!
        }
        node.isEnd = true
    }

    fun search(word: String): Boolean {
        var node = root
        for (c in word) {
            node = node.children[c - 'a'] ?: return false
        }
        return node.isEnd
    }

    fun startsWith(prefix: String): Boolean {
        var node = root
        for (c in prefix) {
            node = node.children[c - 'a'] ?: return false
        }
        return true
    }
}`,
      },
    ],
  },
];
