import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'arrays-hashing',
    title: 'Arrays and Hashing',
    section: 'algorithms',
    description: 'Foundation problems using hash maps and sets to achieve O(n) solutions.',
    problems: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        pattern: 'Hash Map',
        topic: 'arrays-hashing',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
        description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target. Each input has exactly one solution and you may not use the same element twice.',
        hints: [
          'Think about storing previously seen values as you iterate.',
          'A hash map lets you check if (target - current) exists in O(1).',
          'Store value -> index in the map as you go.'
        ],
        solution: {
          typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
          kotlin: `fun twoSum(nums: IntArray, target: Int): IntArray {
    val map = HashMap<Int, Int>()
    for ((i, num) in nums.withIndex()) {
        val complement = target - num
        if (map.containsKey(complement)) {
            return intArrayOf(map[complement]!!, i)
        }
        map[num] = i
    }
    return intArrayOf()
}`
        },
        quiz: {
          question: 'Complete the condition to check if the complement exists in the map:',
          codeSnippet: `fun twoSum(nums: IntArray, target: Int): IntArray {
    val map = HashMap<Int, Int>()
    for ((i, num) in nums.withIndex()) {
        val complement = target - num
        if (___________________) {
            return intArrayOf(map[complement]!!, i)
        }
        map[num] = i
    }
    return intArrayOf()
}`,
          options: [
            'map.containsKey(complement)',
            'map.containsValue(complement)',
            'map[complement] != null',
            'complement in nums',
          ],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        pattern: 'Hash Set',
        topic: 'arrays-hashing',
        leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
        description: 'Given an integer array, return true if any value appears at least twice, false if every element is distinct.',
        hints: [
          'A set only stores unique values - use that property.',
          'If the set size is smaller than the array length after insertion, there was a duplicate.',
          'Or check if the element already exists in the set before inserting.'
        ],
        solution: {
          typescript: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
          kotlin: `fun containsDuplicate(nums: IntArray): Boolean {
    val seen = HashSet<Int>()
    for (num in nums) {
        if (!seen.add(num)) return true
    }
    return false
}`
        }
      },
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        pattern: 'Hash Map',
        topic: 'arrays-hashing',
        leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
        description: 'Given two strings s and t, return true if t is an anagram of s. An anagram uses all original characters exactly once.',
        hints: [
          'Count character frequencies in both strings.',
          'Two strings are anagrams if their character frequency maps are equal.',
          'You can use a single map - increment for s, decrement for t, then check all values are 0.'
        ],
        solution: {
          typescript: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (const c of t) {
    if (!count.get(c)) return false;
    count.set(c, count.get(c)! - 1);
  }
  return true;
}`,
          kotlin: `fun isAnagram(s: String, t: String): Boolean {
    if (s.length != t.length) return false
    val count = HashMap<Char, Int>()
    for (c in s) count[c] = (count[c] ?: 0) + 1
    for (c in t) {
        val curr = count[c] ?: return false
        if (curr == 0) return false
        count[c] = curr - 1
    }
    return true
}`
        }
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        pattern: 'Hash Map',
        topic: 'arrays-hashing',
        leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
        description: 'Given an array of strings, group the anagrams together. The order of output does not matter.',
        hints: [
          'Anagrams have the same sorted string - use that as a key.',
          'Build a map from sorted-string -> list of original strings.',
          'Return the values of the map.'
        ],
        solution: {
          typescript: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return Array.from(map.values());
}`,
          kotlin: `fun groupAnagrams(strs: Array<String>): List<List<String>> {
    val map = HashMap<String, MutableList<String>>()
    for (s in strs) {
        val key = s.toCharArray().sorted().joinToString("")
        map.getOrPut(key) { mutableListOf() }.add(s)
    }
    return map.values.toList()
}`
        }
      }
    ]
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    section: 'algorithms',
    description: 'Use two indices moving toward each other or in the same direction to avoid nested loops.',
    problems: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        pattern: 'Two Pointers',
        topic: 'two-pointers',
        leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
        description: 'A phrase is a palindrome if it reads the same forward and backward after lowercasing and removing non-alphanumeric characters.',
        hints: [
          'Use a left pointer starting at 0 and a right pointer starting at the end.',
          'Skip non-alphanumeric characters by advancing the pointer.',
          'Compare characters at both pointers - if they differ, return false.'
        ],
        solution: {
          typescript: `function isPalindrome(s: string): boolean {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlphanumeric(s[l])) l++;
    while (l < r && !isAlphanumeric(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}

function isAlphanumeric(c: string): boolean {
  return /[a-zA-Z0-9]/.test(c);
}`,
          kotlin: `fun isPalindrome(s: String): Boolean {
    var l = 0; var r = s.length - 1
    while (l < r) {
        while (l < r && !s[l].isLetterOrDigit()) l++
        while (l < r && !s[r].isLetterOrDigit()) r--
        if (s[l].lowercaseChar() != s[r].lowercaseChar()) return false
        l++; r--
    }
    return true
}`
        },
        quiz: {
          question: 'What is the correct outer loop condition so the two pointers never cross?',
          codeSnippet: `fun isPalindrome(s: String): Boolean {
    var l = 0; var r = s.length - 1
    while (___________________) {
        while (l < r && !s[l].isLetterOrDigit()) l++
        while (l < r && !s[r].isLetterOrDigit()) r--
        if (s[l].lowercaseChar() != s[r].lowercaseChar()) return false
        l++; r--
    }
    return true
}`,
          options: ['l < r', 'l <= r', 'l != r', 'l == r'],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'three-sum',
        title: 'Three Sum',
        difficulty: 'Medium',
        pattern: 'Two Pointers',
        topic: 'two-pointers',
        leetcodeUrl: 'https://leetcode.com/problems/3sum/',
        description: 'Find all unique triplets in the array that sum to zero. The solution set must not contain duplicate triplets.',
        hints: [
          'Sort the array first - this lets you use two pointers and skip duplicates.',
          'Fix one element with an outer loop, then use two pointers for the remaining pair.',
          'After finding a valid triplet, advance both pointers and skip duplicates.'
        ],
        solution: {
          typescript: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return result;
}`,
          kotlin: `fun threeSum(nums: IntArray): List<List<Int>> {
    nums.sort()
    val result = mutableListOf<List<Int>>()
    for (i in 0..nums.size - 3) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        var l = i + 1; var r = nums.size - 1
        while (l < r) {
            val sum = nums[i] + nums[l] + nums[r]
            when {
                sum == 0 -> {
                    result.add(listOf(nums[i], nums[l], nums[r]))
                    while (l < r && nums[l] == nums[l + 1]) l++
                    while (l < r && nums[r] == nums[r - 1]) r--
                    l++; r--
                }
                sum < 0 -> l++
                else -> r--
            }
        }
    }
    return result
}`
        }
      },
      {
        id: 'container-with-most-water',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        pattern: 'Two Pointers',
        topic: 'two-pointers',
        leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
        description: 'Given heights representing vertical lines, find two lines that together with the x-axis form a container holding the most water.',
        hints: [
          'Start with pointers at both ends - this gives the maximum width.',
          'Move the pointer pointing to the shorter line inward.',
          'Track the maximum area seen so far.'
        ],
        solution: {
          typescript: `function maxArea(height: number[]): number {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}`,
          kotlin: `fun maxArea(height: IntArray): Int {
    var l = 0; var r = height.size - 1; var max = 0
    while (l < r) {
        max = maxOf(max, minOf(height[l], height[r]) * (r - l))
        if (height[l] < height[r]) l++ else r--
    }
    return max
}`
        }
      }
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    section: 'algorithms',
    description: 'Maintain a window over a sequence that expands and contracts to find optimal subarrays or substrings.',
    problems: [
      {
        id: 'best-time-to-buy-sell-stock',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        pattern: 'Sliding Window',
        topic: 'sliding-window',
        leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        description: 'Given an array of prices where prices[i] is the price on day i, find the maximum profit from one buy and one sell.',
        hints: [
          'Track the minimum price seen so far as you iterate.',
          'At each day, calculate profit if you sold today.',
          'Track the maximum of those profits.'
        ],
        solution: {
          typescript: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
          kotlin: `fun maxProfit(prices: IntArray): Int {
    var minPrice = Int.MAX_VALUE; var maxProfit = 0
    for (price in prices) {
        minPrice = minOf(minPrice, price)
        maxProfit = maxOf(maxProfit, price - minPrice)
    }
    return maxProfit
}`
        },
        quiz: {
          question: 'How do you update the maximum profit on each iteration?',
          codeSnippet: `fun maxProfit(prices: IntArray): Int {
    var minPrice = Int.MAX_VALUE; var maxProfit = 0
    for (price in prices) {
        minPrice = minOf(minPrice, price)
        maxProfit = ___________________
    }
    return maxProfit
}`,
          options: [
            'maxOf(maxProfit, price - minPrice)',
            'price - minPrice',
            'maxOf(maxProfit, minPrice - price)',
            'minOf(maxProfit, price - minPrice)',
          ],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'longest-substring-without-repeating',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        pattern: 'Sliding Window',
        topic: 'sliding-window',
        leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        description: 'Given a string, find the length of the longest substring without repeating characters.',
        hints: [
          'Use a set to track characters in the current window.',
          'If you hit a duplicate, shrink the window from the left until it is gone.',
          'Track the maximum window size seen.'
        ],
        solution: {
          typescript: `function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) {
      set.delete(s[l]);
      l++;
    }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}`,
          kotlin: `fun lengthOfLongestSubstring(s: String): Int {
    val set = HashSet<Char>()
    var l = 0; var max = 0
    for (r in s.indices) {
        while (set.contains(s[r])) {
            set.remove(s[l]); l++
        }
        set.add(s[r])
        max = maxOf(max, r - l + 1)
    }
    return max
}`
        }
      },
      {
        id: 'minimum-window-substring',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        pattern: 'Sliding Window',
        topic: 'sliding-window',
        leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
        description: 'Given strings s and t, return the minimum window substring of s that contains all characters of t. Return empty string if no such window exists.',
        hints: [
          'Use two frequency maps - one for t, one for the current window.',
          'Expand right until you have all required characters, then shrink from left.',
          'Track the smallest valid window seen.'
        ],
        solution: {
          typescript: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, required = need.size;
  let l = 0, minLen = Infinity, minStart = 0;
  const window = new Map<string, number>();
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l; }
      const lc = s[l];
      window.set(lc, window.get(lc)! - 1);
      if (need.has(lc) && window.get(lc)! < need.get(lc)!) have--;
      l++;
    }
  }
  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
}`,
          kotlin: `fun minWindow(s: String, t: String): String {
    val need = HashMap<Char, Int>()
    for (c in t) need[c] = (need[c] ?: 0) + 1
    var have = 0; val required = need.size
    var l = 0; var minLen = Int.MAX_VALUE; var minStart = 0
    val window = HashMap<Char, Int>()
    for (r in s.indices) {
        val c = s[r]
        window[c] = (window[c] ?: 0) + 1
        if (need.containsKey(c) && window[c] == need[c]) have++
        while (have == required) {
            if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l }
            val lc = s[l]
            window[lc] = window[lc]!! - 1
            if (need.containsKey(lc) && window[lc]!! < need[lc]!!) have--
            l++
        }
    }
    return if (minLen == Int.MAX_VALUE) "" else s.substring(minStart, minStart + minLen)
}`
        }
      }
    ]
  },
  {
    id: 'trees-graphs',
    title: 'Trees and Graphs',
    section: 'algorithms',
    description: 'BFS and DFS traversal patterns for trees and graphs.',
    problems: [
      {
        id: 'invert-binary-tree',
        title: 'Invert Binary Tree',
        difficulty: 'Easy',
        pattern: 'DFS',
        topic: 'trees-graphs',
        leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
        description: 'Given the root of a binary tree, invert it and return its root.',
        hints: [
          'Recursion is the cleanest approach here.',
          'At each node, swap the left and right children.',
          'Then recursively invert each subtree.'
        ],
        solution: {
          typescript: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
          kotlin: `fun invertTree(root: TreeNode?): TreeNode? {
    if (root == null) return null
    val temp = root.left
    root.left = invertTree(root.right)
    root.right = invertTree(temp)
    return root
}`
        }
      },
      {
        id: 'max-depth-binary-tree',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        pattern: 'DFS',
        topic: 'trees-graphs',
        leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        description: 'Given the root of a binary tree, return its maximum depth - the number of nodes along the longest path from root to a leaf.',
        hints: [
          'The depth of a node is 1 + the max depth of its children.',
          'Base case: null node has depth 0.',
          'Both recursive DFS and iterative BFS work here.'
        ],
        solution: {
          typescript: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
          kotlin: `fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    return 1 + maxOf(maxDepth(root.left), maxDepth(root.right))
}`
        },
        quiz: {
          question: 'What is the correct recursive return value for maximum depth?',
          codeSnippet: `fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    return ___________________
}`,
          options: [
            '1 + maxOf(maxDepth(root.left), maxDepth(root.right))',
            'maxOf(maxDepth(root.left), maxDepth(root.right))',
            'maxDepth(root.left) + maxDepth(root.right) + 1',
            '1 + maxDepth(root.left) + maxDepth(root.right)',
          ],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        pattern: 'BFS / DFS',
        topic: 'trees-graphs',
        leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
        description: 'Given an m x n grid of 1s (land) and 0s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent land cells horizontally or vertically.',
        hints: [
          'Iterate through the grid. When you find a 1, increment the count.',
          'Then flood-fill (BFS or DFS) from that cell, marking all connected land as visited.',
          'Mark visited cells as 0 to avoid counting them again.'
        ],
        solution: {
          typescript: `function numIslands(grid: string[][]): number {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(grid, r, c);
      }
    }
  }
  return count;
}

function dfs(grid: string[][], r: number, c: number): void {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
  grid[r][c] = '0';
  dfs(grid, r + 1, c); dfs(grid, r - 1, c);
  dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}`,
          kotlin: `fun numIslands(grid: Array<CharArray>): Int {
    var count = 0
    for (r in grid.indices) {
        for (c in grid[0].indices) {
            if (grid[r][c] == '1') { count++; dfs(grid, r, c) }
        }
    }
    return count
}

fun dfs(grid: Array<CharArray>, r: Int, c: Int) {
    if (r < 0 || r >= grid.size || c < 0 || c >= grid[0].size || grid[r][c] != '1') return
    grid[r][c] = '0'
    dfs(grid, r + 1, c); dfs(grid, r - 1, c)
    dfs(grid, r, c + 1); dfs(grid, r, c - 1)
}`
        },
        quiz: {
          question: "When visiting a land cell ('1') in DFS, what must you do immediately to prevent re-visiting?",
          codeSnippet: `fun dfs(grid: Array<CharArray>, r: Int, c: Int) {
    if (r < 0 || r >= grid.size || c < 0 || c >= grid[0].size || grid[r][c] != '1') return
    ___________________
    dfs(grid, r + 1, c); dfs(grid, r - 1, c)
    dfs(grid, r, c + 1); dfs(grid, r, c - 1)
}`,
          options: [
            "grid[r][c] = '0'",
            'count++',
            "grid[r][c] = '1'",
            'return 1',
          ],
          correctAnswerIndex: 0,
        }
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    section: 'algorithms',
    description: 'Break problems into overlapping subproblems. Build up solutions from base cases.',
    problems: [
      {
        id: 'climbing-stairs',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        pattern: 'DP',
        topic: 'dynamic-programming',
        leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
        description: 'You can climb 1 or 2 steps at a time. How many distinct ways can you climb n stairs?',
        hints: [
          'The number of ways to reach step n is ways(n-1) + ways(n-2).',
          'This is the Fibonacci sequence.',
          'You only need the previous two values - no array needed.'
        ],
        solution: {
          typescript: `function climbStairs(n: number): number {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
          kotlin: `fun climbStairs(n: Int): Int {
    var a = 1; var b = 1
    for (i in 2..n) { val temp = b; b = a + b; a = temp }
    return b
}`
        },
        quiz: {
          question: 'What is the recurrence relation for Climbing Stairs (you can take 1 or 2 steps)?',
          codeSnippet: `fun climbStairs(n: Int): Int {
    var a = 1; var b = 1
    for (i in 2..n) {
        val temp = b
        b = ___________________
        a = temp
    }
    return b
}`,
          options: ['a + b', 'a * b', 'maxOf(a, b) + 1', 'a + b + 1'],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'house-robber',
        title: 'House Robber',
        difficulty: 'Medium',
        pattern: 'DP',
        topic: 'dynamic-programming',
        leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
        description: 'You cannot rob two adjacent houses. Given an array of amounts, return the maximum you can rob without triggering alarms.',
        hints: [
          'At each house, decide: rob this one (skip previous) or skip it (take previous max).',
          'dp[i] = max(dp[i-1], dp[i-2] + nums[i]).',
          'You only need the previous two dp values.'
        ],
        solution: {
          typescript: `function rob(nums: number[]): number {
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
          kotlin: `fun rob(nums: IntArray): Int {
    var prev2 = 0; var prev1 = 0
    for (num in nums) {
        val curr = maxOf(prev1, prev2 + num)
        prev2 = prev1; prev1 = curr
    }
    return prev1
}`
        }
      },
      {
        id: 'longest-common-subsequence',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        pattern: 'DP (2D)',
        topic: 'dynamic-programming',
        leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
        description: 'Given two strings, return the length of their longest common subsequence. A subsequence is derived by deleting some characters without changing the order of the remaining characters.',
        hints: [
          'Build a 2D dp table where dp[i][j] = LCS of text1[:i] and text2[:j].',
          'If characters match: dp[i][j] = dp[i-1][j-1] + 1.',
          'If they do not match: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'
        ],
        solution: {
          typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
          kotlin: `fun longestCommonSubsequence(text1: String, text2: String): Int {
    val m = text1.length; val n = text2.length
    val dp = Array(m + 1) { IntArray(n + 1) }
    for (i in 1..m) {
        for (j in 1..n) {
            dp[i][j] = if (text1[i - 1] == text2[j - 1]) dp[i - 1][j - 1] + 1
                       else maxOf(dp[i - 1][j], dp[i][j - 1])
        }
    }
    return dp[m][n]
}`
        }
      }
    ]
  },
  {
    id: 'heap',
    title: 'Heap and Priority Queue',
    section: 'algorithms',
    description: 'Use heaps to efficiently track minimums, maximums and top-K elements.',
    problems: [
      {
        id: 'kth-largest-element',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        pattern: 'Min Heap',
        topic: 'heap',
        leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        description: 'Find the kth largest element in an unsorted array. Note that it is the kth largest in sorted order, not the kth distinct element.',
        hints: [
          'Maintain a min-heap of size k.',
          'If the heap exceeds size k, remove the minimum.',
          'At the end the heap root is the kth largest.'
        ],
        solution: {
          typescript: `// TypeScript does not have a built-in heap. Use a sorted approach or implement a min-heap.
// Quickselect is the optimal O(n) average approach:
function findKthLargest(nums: number[], k: number): number {
  return quickselect(nums, 0, nums.length - 1, nums.length - k);
}

function quickselect(nums: number[], l: number, r: number, k: number): number {
  const pivot = nums[r];
  let p = l;
  for (let i = l; i < r; i++) {
    if (nums[i] <= pivot) { [nums[i], nums[p]] = [nums[p], nums[i]]; p++; }
  }
  [nums[p], nums[r]] = [nums[r], nums[p]];
  if (p === k) return nums[p];
  return p < k ? quickselect(nums, p + 1, r, k) : quickselect(nums, l, p - 1, k);
}`,
          kotlin: `fun findKthLargest(nums: IntArray, k: Int): Int {
    val minHeap = PriorityQueue<Int>()
    for (num in nums) {
        minHeap.offer(num)
        if (minHeap.size > k) minHeap.poll()
    }
    return minHeap.peek()!!
}`
        },
        quiz: {
          question: 'When the min-heap exceeds size k, what should you do to maintain only the k largest elements?',
          codeSnippet: `fun findKthLargest(nums: IntArray, k: Int): Int {
    val minHeap = PriorityQueue<Int>()
    for (num in nums) {
        minHeap.offer(num)
        if (minHeap.size > k) {
            ___________________
        }
    }
    return minHeap.peek()!!
}`,
          options: [
            'minHeap.poll()',
            'minHeap.peek()',
            'minHeap.clear()',
            'minHeap.remove(num)',
          ],
          correctAnswerIndex: 0,
        }
      },
      {
        id: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        pattern: 'Heap / Bucket Sort',
        topic: 'heap',
        leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
        description: 'Given an integer array and an integer k, return the k most frequent elements.',
        hints: [
          'First build a frequency map.',
          'Then use a min-heap of size k to track the top k elements.',
          'Alternatively use bucket sort: buckets indexed by frequency.'
        ],
        solution: {
          typescript: `function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);
  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}`,
          kotlin: `fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val freq = HashMap<Int, Int>()
    for (n in nums) freq[n] = (freq[n] ?: 0) + 1
    val buckets = Array<MutableList<Int>>(nums.size + 1) { mutableListOf() }
    for ((num, count) in freq) buckets[count].add(num)
    val result = mutableListOf<Int>()
    for (i in buckets.indices.reversed()) {
        result.addAll(buckets[i])
        if (result.size >= k) break
    }
    return result.take(k).toIntArray()
}`
        }
      },
      {
        id: 'merge-k-sorted-lists',
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        pattern: 'Min Heap',
        topic: 'heap',
        leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        description: 'Merge k sorted linked lists and return one sorted list.',
        hints: [
          'Push the head of each list into a min-heap.',
          'Pop the minimum, append to result, then push that node\'s next into the heap.',
          'Repeat until the heap is empty.'
        ],
        solution: {
          typescript: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Min-heap via sorted insertion (simplified for interview context)
  const nodes: number[] = [];
  for (let list of lists) {
    while (list) { nodes.push(list.val); list = list.next; }
  }
  nodes.sort((a, b) => a - b);
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of nodes) { curr.next = new ListNode(val); curr = curr.next; }
  return dummy.next;
}`,
          kotlin: `fun mergeKLists(lists: Array<ListNode?>): ListNode? {
    val minHeap = PriorityQueue<ListNode>(compareBy { it.value })
    for (list in lists) if (list != null) minHeap.offer(list)
    val dummy = ListNode(0); var curr = dummy
    while (minHeap.isNotEmpty()) {
        val node = minHeap.poll()
        curr.next = node; curr = curr.next!!
        if (node.next != null) minHeap.offer(node.next)
    }
    return dummy.next
}`
        }
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    section: 'algorithms',
    description: 'High-level architecture questions. Focus on components, trade-offs and scalability.',
    problems: [
      {
        id: 'design-url-shortener',
        title: 'Design a URL Shortener',
        difficulty: 'Medium',
        pattern: 'System Design',
        topic: 'system-design',
        leetcodeUrl: 'https://leetcode.com/problems/design-tinyurl/',
        description: 'Design a service like bit.ly that takes a long URL and returns a short code. The short code redirects to the original URL.',
        hints: [
          'Generate a unique short code (base62 encoding of an auto-incremented ID works well).',
          'Store the mapping in a key-value store (Redis for speed, a DB for persistence).',
          'For scale: use a distributed ID generator (Snowflake), cache hot URLs in Redis, use CDN for redirect traffic.'
        ],
        solution: {
          typescript: `/*
  Key components:
  1. API: POST /shorten -> returns short code, GET /:code -> 301 redirect

  2. ID generation: auto-increment ID -> base62 encode
     base62 chars = [0-9, a-z, A-Z] = 62 chars
     7 chars = 62^7 = ~3.5 trillion unique URLs

  3. Storage: { shortCode -> longUrl } in Redis + persistent DB
     Read-heavy: cache short code lookups in Redis (TTL based)

  4. Scale considerations:
     - Multiple app servers behind load balancer
     - Read replicas for DB
     - CDN at the edge for redirect responses
     - Rate limiting per user
*/

function encode(id: number): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  while (id > 0) {
    result = chars[id % 62] + result;
    id = Math.floor(id / 62);
  }
  return result.padStart(7, '0');
}`
        }
      },
      {
        id: 'design-rate-limiter',
        title: 'Design a Rate Limiter',
        difficulty: 'Medium',
        pattern: 'System Design',
        topic: 'system-design',
        description: 'Design a rate limiter that restricts users to N requests per time window. Used in APIs to prevent abuse.',
        hints: [
          'Common algorithms: Token Bucket (smooth bursting), Sliding Window Log (accurate but memory-heavy), Fixed Window Counter (simple, edge case at window boundary).',
          'Store counters in Redis with TTL equal to the window size.',
          'For distributed systems, use Redis atomic operations (INCR + EXPIRE) to avoid race conditions.'
        ],
        solution: {
          typescript: `/*
  Sliding Window Counter in Redis (most practical for interviews):

  Key: "rate:{userId}:{windowStart}"
  Value: request count
  TTL: window size in seconds

  On each request:
  1. Get current window timestamp (floor to window size)
  2. INCR the counter for this user + window
  3. Set TTL if this is the first request in the window
  4. If count > limit -> reject with 429

  Redis commands (atomic):
  MULTI
    INCR rate:{userId}:{window}
    EXPIRE rate:{userId}:{window} {windowSeconds}
  EXEC

  For sliding window precision:
  - Store timestamps of each request in a sorted set
  - Remove entries older than the window on each request
  - Count remaining entries
*/`
        }
      },
      {
        id: 'design-chat-system',
        title: 'Design a Chat System',
        difficulty: 'Hard',
        pattern: 'System Design',
        topic: 'system-design',
        description: 'Design a real-time chat system supporting 1:1 and group messaging at scale.',
        hints: [
          'Use WebSockets for real-time bidirectional messaging. Long polling is the fallback.',
          'Message storage: each message needs sender, receiver/channel, content, timestamp, message ID. Use a DB with fast writes (Cassandra for scale, Postgres for smaller scale).',
          'Fan-out: when a message arrives, push to all active recipients via their WebSocket connection. For offline users, store undelivered messages.'
        ],
        solution: {
          typescript: `/*
  Core components:

  1. Connection layer: WebSocket servers. Each server maintains connections
     for a subset of users. A service registry (Redis) maps userId -> server.

  2. Message flow:
     User A sends message -> WebSocket server -> message queue (Kafka)
     -> consumer reads queue -> looks up recipients' servers
     -> pushes to recipient WebSocket servers -> delivered to User B

  3. Storage:
     Messages: Cassandra (high write throughput, ordered by conversation + timestamp)
     User/conversation metadata: Postgres
     Active sessions: Redis (userId -> serverId, TTL = session timeout)

  4. Offline delivery:
     If recipient not connected, store message with "undelivered" status.
     On reconnect, fetch undelivered messages and mark as delivered.

  5. Scale:
     Horizontal scaling of WebSocket servers
     Kafka partitioned by conversation ID for ordering guarantees
     Read replicas for message history queries
*/`
        }
      }
    ]
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    section: 'frontend',
    description: 'Core React concepts that come up in every frontend interview.',
    problems: [
      {
        id: 'useeffect-patterns',
        title: 'useEffect Patterns',
        difficulty: 'Medium',
        pattern: 'Hooks',
        topic: 'react-fundamentals',
        description: 'Understand when and how useEffect runs, how to clean up side effects and common pitfalls with the dependency array.',
        hints: [
          'useEffect runs after every render by default. The dependency array controls when it re-runs.',
          'Empty array [] means run once on mount. No array means run on every render.',
          'Always clean up subscriptions, timers and event listeners in the return function.'
        ],
        solution: {
          typescript: `// Pattern 1: fetch on mount
useEffect(() => {
  let cancelled = false;
  async function load() {
    const data = await fetchData();
    if (!cancelled) setData(data);
  }
  load();
  return () => { cancelled = true; };
}, []);

// Pattern 2: event listener cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);

// Pattern 3: derived state - don't use useEffect for this
// BAD: useEffect(() => setFullName(first + ' ' + last), [first, last])
// GOOD: const fullName = first + ' ' + last; // just compute it`
        }
      },
      {
        id: 'controlled-vs-uncontrolled',
        title: 'Controlled vs Uncontrolled Components',
        difficulty: 'Easy',
        pattern: 'Forms',
        topic: 'react-fundamentals',
        description: 'Understand the difference between controlled inputs (state-driven) and uncontrolled inputs (DOM-driven via refs).',
        hints: [
          'Controlled: value is driven by React state. Every keystroke updates state.',
          'Uncontrolled: DOM manages the value. Use a ref to read it when needed.',
          'Use controlled for validation, dynamic forms and interdependent fields. Use uncontrolled for simple one-shot forms or file inputs.'
        ],
        solution: {
          typescript: `// Controlled component
function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled component
function UncontrolledInput() {
  const ref = useRef<HTMLInputElement>(null);
  function handleSubmit() {
    console.log(ref.current?.value);
  }
  return <input ref={ref} defaultValue="" />;
}

// File inputs are always uncontrolled - you cannot set their value programmatically`
        }
      },
      {
        id: 'react-reconciliation',
        title: 'Reconciliation and the Key Prop',
        difficulty: 'Medium',
        pattern: 'Rendering',
        topic: 'react-fundamentals',
        description: 'How React diffs the virtual DOM and why the key prop matters for list rendering performance and correctness.',
        hints: [
          'React compares the previous and new virtual DOM trees. Same type at same position = update, different type = unmount + remount.',
          'Keys help React identify which list items changed, were added or removed.',
          'Never use array index as a key for lists that can be reordered - it causes incorrect state association.'
        ],
        solution: {
          typescript: `// BAD: index as key causes bugs when items reorder
items.map((item, i) => <Item key={i} {...item} />)

// GOOD: stable unique ID as key
items.map(item => <Item key={item.id} {...item} />)

// Force remount by changing key (useful for resetting component state)
<Profile key={userId} userId={userId} />
// When userId changes, React unmounts the old Profile and mounts a fresh one
// All state is reset - no need for useEffect cleanup

// React batches state updates in event handlers (React 18+: batches everywhere)
function handleClick() {
  setA(1); // does not re-render yet
  setB(2); // does not re-render yet
  // single re-render happens here
}`
        }
      }
    ]
  },
  {
    id: 'react-patterns',
    title: 'React Patterns and Hooks',
    section: 'frontend',
    description: 'Custom hooks, performance patterns and component composition techniques.',
    problems: [
      {
        id: 'custom-hooks',
        title: 'Writing Custom Hooks',
        difficulty: 'Medium',
        pattern: 'Custom Hooks',
        topic: 'react-patterns',
        description: 'Extract stateful logic into reusable custom hooks. Custom hooks are functions that start with "use" and can call other hooks.',
        hints: [
          'A custom hook is just a function that uses other hooks. No special API.',
          'Use them to share logic between components - not to share state (each call gets its own state).',
          'Common patterns: useFetch, useLocalStorage, useDebounce, useWindowSize.'
        ],
        solution: {
          typescript: `// useLocalStorage hook
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  const set = useCallback((v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  }, [key]);

  return [value, set] as const;
}

// useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}`
        }
      },
      {
        id: 'usememo-usecallback',
        title: 'useMemo and useCallback',
        difficulty: 'Medium',
        pattern: 'Performance',
        topic: 'react-patterns',
        description: 'When and why to memoize values and callbacks. Understanding when these actually help vs adding unnecessary complexity.',
        hints: [
          'useMemo memoizes a computed value. useCallback memoizes a function reference.',
          'Only useful when the memoized value is passed to a child wrapped in React.memo, or is a dependency of another hook.',
          'Do not reach for these by default - they add complexity and have their own cost. Profile first.'
        ],
        solution: {
          typescript: `// useMemo: expensive computation
const sorted = useMemo(
  () => items.slice().sort((a, b) => a.price - b.price),
  [items] // recompute only when items changes
);

// useCallback: stable function reference for memoized child
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []); // stable reference - no deps means never recreates

// React.memo: skip re-render if props unchanged
const ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {
  return items.map(item => (
    <div key={item.id} onClick={() => onSelect(item.id)}>{item.name}</div>
  ));
});

// Without useCallback, handleClick recreates on every render
// -> ExpensiveList sees new prop reference -> re-renders anyway
// -> React.memo is useless without stable callbacks`
        }
      },
      {
        id: 'compound-components',
        title: 'Compound Components Pattern',
        difficulty: 'Hard',
        pattern: 'Component Patterns',
        topic: 'react-patterns',
        description: 'Build flexible, composable component APIs using context and the compound component pattern. Common in design systems.',
        hints: [
          'Parent component holds state and exposes it via context.',
          'Child components consume the context - they do not receive props directly.',
          'Attach children as properties of the parent component for a clean API: <Tabs.List>, <Tabs.Panel>.'
        ],
        solution: {
          typescript: `const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.active === id}
      onClick={() => ctx.setActive(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return ctx.active === id ? <div role="tabpanel">{children}</div> : null;
};

// Usage:
// <Tabs defaultTab="a">
//   <Tabs.List>
//     <Tabs.Tab id="a">Tab A</Tabs.Tab>
//     <Tabs.Tab id="b">Tab B</Tabs.Tab>
//   </Tabs.List>
//   <Tabs.Panel id="a">Content A</Tabs.Panel>
//   <Tabs.Panel id="b">Content B</Tabs.Panel>
// </Tabs>`
        }
      }
    ]
  }
];

export const allProblems = topics.flatMap(t => t.problems);

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

export function getProblemById(id: string) {
  return allProblems.find(p => p.id === id);
}
