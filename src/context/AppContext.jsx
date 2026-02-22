import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [vocabularyWords, setVocabularyWords] = useState([
        { word: 'Prudent', meaning: 'Acting with or showing care and thought for the future.', synonyms: ['Cautious', 'Wise'], antonyms: ['Reckless', 'Imprudent'], example: 'No prudent money manager would authorize such a loan.' },
        { word: 'Resilient', meaning: 'Able to withstand or recover quickly from difficult conditions.', synonyms: ['Tough', 'Flexible'], antonyms: ['Fragile', 'Vulnerable'], example: 'Babies are remarkably resilient.' },
        { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing.', synonyms: ['Articulate', 'Expressive'], antonyms: ['Inarticulate', 'Dull'], example: 'She made an eloquent appeal for support.' }
    ]);

    const [listeningTracks, setListeningTracks] = useState([
        {
            id: 'l1', title: 'Basic Introductions', level: 'Easy', duration: '90s',
            questions: [
                { q: 'Where did the speaker move from?', options: ['London', 'New York', 'Paris', 'Tokyo'], correct: 0, type: 'mcq' },
                { q: 'The speaker is a software engineer.', options: ['True', 'False'], correct: 0, type: 'boolean' }
            ]
        },
        {
            id: 'l2', title: 'Tech Interview Snippet', level: 'Medium', duration: '120s',
            questions: [
                { q: 'What is the main challenge discussed?', options: ['Salary', 'Tech Stack', 'Work-life balance', 'Commute'], correct: 1, type: 'mcq' }
            ]
        }
    ]);

    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([
        { id: 'q1', text: 'Tell me about yourself.', category: 'HR' },
        { id: 'q2', text: 'What are your strengths and weaknesses?', category: 'HR' },
        { id: 'q3', text: 'Why should we hire you?', category: 'HR' },
        { id: 'q4', text: 'Explain the concept of OOP in detail.', category: 'Technical' }
    ]);

    const [codingTopics] = useState([
        {
            id: 'arrays',
            name: 'Arrays',
            problems: 15,
            solved: 0,
            explanation: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.",
            subtopics: ['Basic Operations', 'Prefix Sum', 'Sliding Window', 'Two Pointers'],
            links: {
                leetcode: 'https://leetcode.com/tag/array/',
                codechef: 'https://www.codechef.com/practice?tags=Arrays',
                codeforces: 'https://codeforces.com/problemset?tags=arrays',
                hackerrank: 'https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=arrays'
            }
        },
        {
            id: 'strings',
            name: 'Strings',
            problems: 12,
            solved: 0,
            explanation: "Strings are defined as an array of characters. The difference between a character array and a string is the string is terminated with a special character '\\0'.",
            subtopics: ['String Manipulation', 'Pattern Matching', 'KMP Algorithm', 'Anagrams'],
            links: {
                leetcode: 'https://leetcode.com/tag/string/',
                codechef: 'https://www.codechef.com/practice?tags=Strings',
                codeforces: 'https://codeforces.com/problemset?tags=strings',
                hackerrank: 'https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=strings'
            }
        },
        {
            id: 'recursion',
            name: 'Recursion',
            problems: 8,
            solved: 0,
            explanation: "The process in which a function calls itself directly or indirectly is called recursion and the corresponding function is called a recursive function.",
            subtopics: ['Base Cases', 'Backtracking', 'Memoization', 'Divide and Conquer'],
            links: {
                leetcode: 'https://leetcode.com/tag/recursion/',
                codechef: 'https://www.codechef.com/practice?tags=Recursion',
                codeforces: 'https://codeforces.com/problemset?tags=recursion',
                hackerrank: 'https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=recursion'
            }
        },
        {
            id: 'linked-list',
            name: 'Linked List',
            problems: 10,
            solved: 0,
            explanation: "A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.",
            subtopics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Cycle Detection'],
            links: {
                leetcode: 'https://leetcode.com/tag/linked-list/',
                codechef: 'https://www.codechef.com/practice?tags=Linked%20List',
                codeforces: 'https://codeforces.com/problemset?tags=data%20structures',
                hackerrank: 'https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=linked-lists'
            }
        },
        {
            id: 'stack',
            name: 'Stack',
            problems: 10,
            solved: 0,
            explanation: "Stack is a linear data structure which follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out).",
            subtopics: ['Push/Pop Operations', 'Monotonic Stack', 'Expression Evaluation', 'Next Greater Element'],
            links: {
                leetcode: 'https://leetcode.com/tag/stack/',
                codechef: 'https://www.codechef.com/practice?tags=Stack',
                codeforces: 'https://codeforces.com/problemset?tags=data%20structures',
                hackerrank: 'https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=stacks'
            }
        },
        {
            id: 'queue',
            name: 'Queue',
            problems: 10,
            solved: 0,
            explanation: "A Queue is a linear structure which follows a particular order in which the operations are performed. The order is First In First Out (FIFO).",
            subtopics: ['Enqueue/Dequeue', 'Dequeue (Double-ended)', 'Priority Queue', 'Circular Queue'],
            links: {
                leetcode: 'https://leetcode.com/tag/queue/',
                codechef: 'https://www.codechef.com/practice?tags=Queue',
                codeforces: 'https://codeforces.com/problemset?tags=data%20structures',
                hackerrank: 'https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=queues'
            }
        },
        {
            id: 'trees',
            name: 'Trees',
            problems: 12,
            solved: 0,
            explanation: "A tree is a non-linear data structure, compared to arrays, linked lists, stacks and queues which are linear data structures. A tree can be empty with no nodes or a tree is a structure consisting of one node called the root and zero or one or more subtrees.",
            subtopics: ['Binary Search Tree', 'Tree Traversals', 'Balanced Trees', 'Binary Tree Diameter'],
            links: {
                leetcode: 'https://leetcode.com/tag/tree/',
                codechef: 'https://www.codechef.com/practice?tags=Tree',
                codeforces: 'https://codeforces.com/problemset?tags=trees',
                hackerrank: 'https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=trees'
            }
        },
        {
            id: 'graphs',
            name: 'Graphs',
            problems: 10,
            solved: 0,
            explanation: "A Graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred to as vertices and the edges are lines or arcs that connect any two nodes in the graph.",
            subtopics: ['BFS & DFS', 'Dijkstra Algorithm', 'Topological Sort', 'Cycle Detection'],
            links: {
                leetcode: 'https://leetcode.com/tag/graph/',
                codechef: 'https://www.codechef.com/practice?tags=Graph',
                codeforces: 'https://codeforces.com/problemset?tags=graphs',
                hackerrank: 'https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=graph-theory'
            }
        },
        {
            id: 'dp',
            name: 'Dynamic Programming',
            problems: 15,
            solved: 0,
            explanation: "Dynamic Programming is mainly an optimization over plain recursion. Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using Dynamic Programming.",
            subtopics: ['Memoization', 'Tabulation', 'Knapsack Problems', 'Longest Common Subsequence'],
            links: {
                leetcode: 'https://leetcode.com/tag/dynamic-programming/',
                codechef: 'https://www.codechef.com/practice?tags=Dynamic%20Programming',
                codeforces: 'https://www.codechef.com/problemset?tags=dp',
                hackerrank: 'https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=dynamic-programming'
            }
        },
    ]);

    const [aptitudeTopics] = useState([
        {
            id: 'trains',
            name: 'Trains',
            explanation: "Problems on trains are based on the basic formula: Distance = Speed × Time. However, there are nuances when a train crosses a pole, another train, or a bridge.",
            formulas: [
                "1 km/hr = 5/18 m/s",
                "1 m/s = 18/5 km/hr",
                "Time taken by a train of length L to pass a pole: L / Speed",
                "Time taken by a train of length L to pass a platform of length P: (L + P) / Speed"
            ],
            tricks: "When two trains move in opposite directions, relative speed = S1 + S2. When in same direction, relative speed = |S1 - S2|.",
            examples: [
                { q: "A train 100m long is running at 36km/h. Time to pass a man?", a: "Speed = 36 * 5/18 = 10m/s. Time = 100/10 = 10s." }
            ]
        },
        {
            id: 'average',
            name: 'Average',
            explanation: "Average is the sum of quantities divided by the number of quantities.",
            formulas: ["Average = (Sum of observations) / (Number of observations)"],
            tricks: "Average of first 'n' natural numbers = (n + 1) / 2",
            examples: [{ q: "Find avg of 10, 20, 30", a: "Sum = 60, Count = 3. Avg = 60/3 = 20." }]
        },
        { id: 'percentage', name: 'Percentage', explanation: "Percent means per hundred.", formulas: ["Percentage = (Value / Total) * 100"], tricks: "x% of y = y% of x", examples: [] },
        { id: 'height-distance', name: 'Height and Distance', explanation: "Uses trigonometry to find heights and distances.", formulas: ["tan θ = Height / Base"], tricks: "Memorize tan 30, 45, 60 values.", examples: [] },
        { id: 'hcf-lcm', name: 'HCF & LCM', explanation: "HCF is Greatest Common Divisor, LCM is Least Common Multiple.", formulas: ["Product of two numbers = HCF × LCM"], tricks: "HCF of fractions = HCF of Numerators / LCM of Denominators", examples: [] },
        { id: 'speed-time-distance', name: 'Speed, Time & Distance', explanation: "Relationship between motion parameters.", formulas: ["Speed = Distance / Time"], tricks: "Average Speed = 2xy / (x + y) for same distance.", examples: [] },
        { id: 'time-work-wages', name: 'Time, Work & Wages', explanation: "Work done is proportional to time and person's efficiency.", formulas: ["Work = Efficiency × Time"], tricks: "If A does work in x days and B in y days, together they take xy/(x+y) days.", examples: [] },
        { id: 'ages', name: 'Ages', explanation: "Problems involving ratios and current/past/future ages.", formulas: ["Relative age difference remains constant."], tricks: "Use variable 'x' for the common ratio.", examples: [] },
        { id: 'permutations', name: 'Permutations', explanation: "Arrangements where order matters.", formulas: ["nPr = n! / (n-r)!"], tricks: "nPn = n!", examples: [] },
        { id: 'ratio-proportion', name: 'Ratio & Proportion', explanation: "Comparison of two quantities of the same kind.", formulas: ["a:b = c:d => ad = bc"], tricks: "Ratio doesn't change if terms are multiplied by same number.", examples: [] },
        { id: 'profit-loss', name: 'Profit & Loss', explanation: "Relationship between Cost Price and Selling Price.", formulas: ["Profit % = (Profit/CP) * 100"], tricks: "If CP = SP, no profit no loss.", examples: [] },
        { id: 'volume-surface-area', name: 'Volume & Surface Area', explanation: "3D geometry properties.", formulas: ["Cube Vol = a³", "Sphere Vol = 4/3 πr³"], tricks: "Unit of volume is cubic units.", examples: [] },
        { id: 'simple-compound-interest', name: 'Simple & Compound Interest', explanation: "Cost of borrowing money.", formulas: ["SI = PRT/100", "CI = P(1 + R/100)^n - P"], tricks: "CI is interest on interest.", examples: [] },
        { id: 'probability', name: 'Probability', explanation: "Likelihood of an event occurring.", formulas: ["P(E) = Fav Outcomes / Total Outcomes"], tricks: "0 ≤ P(E) ≤ 1", examples: [] },
        { id: 'pipes-cistern', name: 'Pipes & Cistern', explanation: "Similar to Time & Work; outlet pipes have negative efficiency.", formulas: ["Net work = Sum of individual efficiencies"], tricks: "Emptying pipe efficiency is negative.", examples: [] },
        { id: 'discount', name: 'Discount', explanation: "Reduction in marked price.", formulas: ["SP = Marked Price - Discount"], tricks: "Discount is always calculated on MP.", examples: [] },
        { id: 'boats-streams', name: 'Boats & Streams', explanation: "Motion in moving water.", formulas: ["Downstream Speed = u + v", "Upstream Speed = u - v"], tricks: "u = speed in still water, v = speed of stream.", examples: [] },
    ]);

    const [communicationData, setCommunicationData] = useState({
        score: 72,
        level: 'Intermediate',
        streak: 5,
        totalWords: 128,
        vocabParticipation: 85,
        speakingRating: 6.8, // out of 10
        listeningAccuracy: 78,
        gdParticipation: 60,
        interviewScore: 70,
        peerSpeakingAvg: 7.2,
        mentorSpeakingAvg: 6.5,
        sessionsDone: 12,
        upcomingSessions: [
            { id: 1, type: 'GD', topic: 'Future of Remote Work', time: 'Tomorrow, 4:00 PM', participants: 4 },
            { id: 2, type: '1:1 Mentor', topic: 'Mock Interview Prep', time: 'Feb 25, 2:30 PM', mentor: 'Sarah Jennings' }
        ],
        feedback: [
            { mentor: 'Sarah Jennings', date: 'Feb 20, 2026', score: 7, comment: 'Good vocabulary usage, but needs to work on pacing and fillers like "um" and "uh".' },
            { mentor: 'System', date: 'Feb 18, 2026', score: 9, comment: 'Excellent performance in technical listening module.' }
        ]
    });

    const [liveRooms, setLiveRooms] = useState([
        { id: 'room-1', type: 'Speaking', topic: 'Climate Change', participants: 2, max: 3, host: 'Aravind' },
        { id: 'room-2', type: 'GD', topic: 'Universal Basic Income', participants: 5, max: 8, host: 'Priya' }
    ]);

    const [mentorBookings, setMentorBookings] = useState([
        { id: 1, mentor: 'Sarah Jennings', date: '2026-02-25', time: '14:30', status: 'Confirmed' },
        { id: 2, mentor: 'David Wilson', date: '2026-02-27', time: '10:00', status: 'Pending' }
    ]);

    const [leaderboard, setLeaderboard] = useState([
        { id: 1, name: 'Alice Smith', score: 2450, rank: 1 },
        { id: 2, name: 'Bob Johnson', score: 2320, rank: 2 },
        { id: 3, name: 'Charlie Brown', score: 2100, rank: 3 },
        { id: 4, name: 'Diana Prince', score: 1980, rank: 4 },
        { id: 5, name: 'Ethan Hunt', score: 1850, rank: 5 },
    ]);

    const [aptitudeQuestions] = useState([
        {
            id: 1,
            topic: 'time-work',
            question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is?",
            options: ['1/4', '1/10', '7/15', '8/15'],
            correct: 3 // '8/15'
        },
        {
            id: 2,
            topic: 'trains',
            question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
            options: ['120 metres', '180 metres', '324 metres', '150 metres'],
            correct: 3 // '150 metres'
        },
        {
            id: 3,
            topic: 'pnc',
            question: "In how many ways can the letters of the word 'LEADER' be arranged?",
            options: ['72', '144', '360', '720'],
            correct: 2 // '360'
        }
    ]);

    const [codingStats, setCodingStats] = useState({
        score: 75,
        solvedProblems: 28,
        totalProblems: 150,
        accuracy: 82,
        runtimeBeats: 92,
        memoryBeats: 88
    });

    const [aptitudeStats, setAptitudeStats] = useState({
        accuracy: 72,
        speedAttempts: 5,
        dailyDrillDone: false,
        weakTopics: ['Profit & Loss'],
        completedFormulas: []
    });

    const [readinessIndex, setReadinessIndex] = useState(68); // Holistic Score

    const calculateReadiness = (updatedCoding = codingStats, updatedApti = aptitudeStats, updatedComm = communicationData) => {
        // Weighted Score: 40% Coding, 30% Aptitude, 30% Communication
        const coding = updatedCoding.score;
        const aptitude = updatedApti.accuracy;
        const comms = updatedComm.score;

        const holistic = Math.round((coding * 0.4) + (aptitude * 0.3) + (comms * 0.3));
        setReadinessIndex(holistic);
    };

    const updateCodingStats = (newStats) => {
        setCodingStats(prev => {
            const updated = { ...prev, ...newStats };
            calculateReadiness(updated, aptitudeStats, communicationData);
            return updated;
        });
    };

    const updateAptitudeStats = (newStats) => {
        setAptitudeStats(prev => {
            const updated = { ...prev, ...newStats };
            calculateReadiness(codingStats, updated, communicationData);
            return updated;
        });
    };

    const [roadmapData, setRoadmapData] = useState([
        { id: 1, title: 'Array Mastery', status: 'completed', type: 'coding', icon: 'Code' },
        { id: 2, title: 'Quant Basics', status: 'completed', type: 'aptitude', icon: 'Book' },
        { id: 3, title: 'GD Simulation', status: 'current', type: 'comms', icon: 'Message' },
        { id: 4, title: 'Dynamic Programming', status: 'upcoming', type: 'coding', icon: 'Zap' },
        { id: 5, title: 'Mock Interview', status: 'upcoming', type: 'comms', icon: 'User' }
    ]);

    return (
        <AppContext.Provider value={{
            codingTopics, aptitudeTopics, aptitudeQuestions,
            communicationData, setCommunicationData,
            vocabularyWords, setVocabularyWords,
            listeningTracks, setListeningTracks,
            mockInterviewQuestions, setMockInterviewQuestions,
            liveRooms, setLiveRooms,
            mentorBookings, setMentorBookings,
            leaderboard, setLeaderboard,
            codingStats, updateCodingStats,
            aptitudeStats, updateAptitudeStats,
            readinessIndex, calculateReadiness,
            roadmapData, setRoadmapData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
export const useApp = () => useContext(AppContext);
