// Content Generators Module
// Generates learning materials from retrieved data

import type { RetrievedData } from './retrieval';
import type { LearningMaterial, Example, QuizQuestion } from '@/types/learning';

export async function generateNotes(data: RetrievedData, topic: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  
  return `# ${formattedTopic}

## Overview
${formattedTopic} is a fundamental concept in computer science that plays a crucial role in efficient data processing and algorithm design.

## Key Concepts
${data.notes.map((note, i) => `${i + 1}. ${note}`).join('\n')}

## Important Points
- **Time Complexity**: Understanding the efficiency of operations
- **Space Complexity**: Memory usage considerations
- **Best Practices**: When and how to apply ${formattedTopic}

## Applications
- Software development and system design
- Database optimization
- Algorithm design and analysis
- Real-world problem solving

## Summary
Mastering ${formattedTopic} is essential for any programmer looking to write efficient and scalable code. The concepts covered here form the foundation for more advanced topics.`;
}

export async function generateExplanation(data: RetrievedData, topic: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return `## Understanding ${topic} in Simple Terms

${data.explanations.join('\n\n')}

### Why is this important?

Imagine you're organizing a library. You wouldn't just throw books randomly on shelves - you'd organize them so anyone can find what they need quickly. That's essentially what ${topic} helps us do with data in computers.

### Real-World Analogy

Think of ${topic} like a well-organized filing cabinet:
- Each drawer represents a category
- Files within are sorted for quick access
- You can find any document without searching through everything

### Key Takeaways

1. **Efficiency**: Operations complete faster with proper implementation
2. **Scalability**: Handles growing data volumes gracefully
3. **Reliability**: Consistent performance across different scenarios

### When to Use It

${topic} is particularly useful when:
- You need fast data access
- Memory efficiency is important
- The data has specific patterns or requirements

### Common Misconceptions

Many beginners think ${topic} is always the best choice. However, the right approach depends on your specific use case. Always consider:
- The size of your data
- Types of operations needed
- Trade-offs between time and space`;
}

export async function generateCode(data: RetrievedData, topic: string): Promise<{ python: string; java: string; javascript: string }> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const topicVar = topic.toLowerCase().replace(/\s+/g, '_');
  
  return {
    python: `"""
${topic} Implementation in Python
================================
This module provides a comprehensive implementation
with examples and best practices.
"""

class ${toPascalCase(topic)}:
    """
    A class implementing ${topic} with common operations.
    
    Attributes:
        data: The underlying data structure
        size: Current number of elements
    """
    
    def __init__(self):
        """Initialize an empty ${topic} instance."""
        self.data = []
        self.size = 0
    
    def insert(self, value):
        """
        Insert a new value.
        
        Args:
            value: The value to insert
            
        Time Complexity: O(1) average case
        """
        self.data.append(value)
        self.size += 1
    
    def search(self, value):
        """
        Search for a value.
        
        Args:
            value: The value to find
            
        Returns:
            int: Index if found, -1 otherwise
        """
        for i, item in enumerate(self.data):
            if item == value:
                return i
        return -1
    
    def delete(self, value):
        """
        Delete a value if it exists.
        
        Args:
            value: The value to remove
            
        Returns:
            bool: True if deleted, False otherwise
        """
        try:
            self.data.remove(value)
            self.size -= 1
            return True
        except ValueError:
            return False
    
    def display(self):
        """Print all elements."""
        print(f"${topic}: {self.data}")


# Example usage
if __name__ == "__main__":
    ${topicVar} = ${toPascalCase(topic)}()
    
    # Insert elements
    ${topicVar}.insert(10)
    ${topicVar}.insert(20)
    ${topicVar}.insert(30)
    
    # Display
    ${topicVar}.display()
    
    # Search
    result = ${topicVar}.search(20)
    print(f"Found at index: {result}")
    
    # Delete
    ${topicVar}.delete(20)
    ${topicVar}.display()`,

    java: `/**
 * ${topic} Implementation in Java
 * ================================
 * A comprehensive implementation with
 * proper documentation and examples.
 */

import java.util.ArrayList;
import java.util.List;

public class ${toPascalCase(topic)} {
    private List<Integer> data;
    private int size;
    
    /**
     * Initialize an empty ${topic} instance.
     */
    public ${toPascalCase(topic)}() {
        this.data = new ArrayList<>();
        this.size = 0;
    }
    
    /**
     * Insert a new value.
     * Time Complexity: O(1) amortized
     * 
     * @param value The value to insert
     */
    public void insert(int value) {
        data.add(value);
        size++;
    }
    
    /**
     * Search for a value in the structure.
     * Time Complexity: O(n)
     * 
     * @param value The value to find
     * @return Index if found, -1 otherwise
     */
    public int search(int value) {
        for (int i = 0; i < data.size(); i++) {
            if (data.get(i) == value) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Delete a value if it exists.
     * 
     * @param value The value to remove
     * @return true if deleted, false otherwise
     */
    public boolean delete(int value) {
        return data.remove(Integer.valueOf(value));
    }
    
    /**
     * Display all elements.
     */
    public void display() {
        System.out.println("${topic}: " + data);
    }
    
    /**
     * Get current size.
     * @return Number of elements
     */
    public int getSize() {
        return size;
    }
    
    // Example usage
    public static void main(String[] args) {
        ${toPascalCase(topic)} instance = new ${toPascalCase(topic)}();
        
        // Insert elements
        instance.insert(10);
        instance.insert(20);
        instance.insert(30);
        
        // Display
        instance.display();
        
        // Search
        int result = instance.search(20);
        System.out.println("Found at index: " + result);
        
        // Delete
        instance.delete(20);
        instance.display();
    }
}`,

    javascript: `/**
 * ${topic} Implementation in JavaScript
 * =====================================
 * Modern ES6+ implementation with
 * comprehensive documentation.
 */

class ${toPascalCase(topic)} {
  /**
   * Initialize an empty ${topic} instance.
   */
  constructor() {
    this.data = [];
    this.size = 0;
  }

  /**
   * Insert a new value.
   * Time Complexity: O(1)
   * 
   * @param {*} value - The value to insert
   */
  insert(value) {
    this.data.push(value);
    this.size++;
  }

  /**
   * Search for a value.
   * Time Complexity: O(n)
   * 
   * @param {*} value - The value to find
   * @returns {number} Index if found, -1 otherwise
   */
  search(value) {
    return this.data.findIndex(item => item === value);
  }

  /**
   * Delete a value if it exists.
   * 
   * @param {*} value - The value to remove
   * @returns {boolean} True if deleted
   */
  delete(value) {
    const index = this.search(value);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.size--;
      return true;
    }
    return false;
  }

  /**
   * Display all elements.
   */
  display() {
    console.log(\`${topic}: [\${this.data.join(', ')}]\`);
  }

  /**
   * Check if empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Get all elements as array.
   * @returns {Array}
   */
  toArray() {
    return [...this.data];
  }
}

// Example usage
const instance = new ${toPascalCase(topic)}();

// Insert elements
instance.insert(10);
instance.insert(20);
instance.insert(30);

// Display
instance.display();

// Search
const result = instance.search(20);
console.log(\`Found at index: \${result}\`);

// Delete
instance.delete(20);
instance.display();

// Export for module usage
export default ${toPascalCase(topic)};`,
  };
}

export async function generateExamples(data: RetrievedData, topic: string): Promise<Example[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      input: `Insert values: 5, 3, 7, 1, 9`,
      output: `[5, 3, 7, 1, 9]`,
      explanation: `Sequential insertion into ${topic}. Each element is added to the structure maintaining its properties.`,
    },
    {
      input: `Search for value: 7`,
      output: `Found at index: 2`,
      explanation: `Linear search through the structure. Returns the position where the element is located.`,
    },
    {
      input: `Delete value: 3`,
      output: `[5, 7, 1, 9]`,
      explanation: `Removes the specified element and maintains structure integrity.`,
    },
    {
      input: `Insert values: 100, 50, 150, 25, 75`,
      output: `[100, 50, 150, 25, 75]`,
      explanation: `Building a ${topic} with a specific pattern. Note the order of insertion affects the final structure.`,
    },
    {
      input: `Check if empty after clearing`,
      output: `true`,
      explanation: `After removing all elements, the isEmpty() check returns true.`,
    },
  ];
}

export async function generateQuiz(data: RetrievedData, topic: string): Promise<QuizQuestion[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '1',
      type: 'mcq',
      question: `What is the primary advantage of using ${topic}?`,
      options: [
        'Faster search operations',
        'Lower memory usage',
        'Simpler implementation',
        'Better code readability',
      ],
      correctAnswer: 0,
      explanation: `${topic} is primarily designed to optimize search operations, making data retrieval more efficient.`,
    },
    {
      id: '2',
      type: 'mcq',
      question: `Which operation has O(1) time complexity in ${topic}?`,
      options: [
        'Search',
        'Insert (at end)',
        'Delete (from middle)',
        'Sort',
      ],
      correctAnswer: 1,
      explanation: `Insertion at the end of the structure typically takes constant time O(1) as it doesn't require shifting elements.`,
    },
    {
      id: '3',
      type: 'true-false',
      question: `${topic} always maintains elements in sorted order.`,
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: `This depends on the specific implementation. A basic ${topic} doesn't guarantee sorted order unless specifically designed to do so.`,
    },
    {
      id: '4',
      type: 'mcq',
      question: `What is the worst-case time complexity for searching in ${topic}?`,
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: `In the worst case, you may need to traverse all elements, resulting in O(n) time complexity.`,
    },
    {
      id: '5',
      type: 'true-false',
      question: `${topic} is always the best choice for storing ordered data.`,
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: `The best data structure depends on your specific use case. Different structures excel at different operations.`,
    },
    {
      id: '6',
      type: 'short-answer',
      question: `What happens when you try to delete an element that doesn't exist in ${topic}?`,
      correctAnswer: 'returns false',
      explanation: `The delete operation typically returns false or throws an exception when the element is not found.`,
    },
  ];
}

// Helper function to convert to PascalCase
function toPascalCase(str: string): string {
  return str
    .split(/[\s_-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
