/**
 * Service: quizService
 * Purpose: Mock API layer for quiz data and operations
 * Provides: Quiz list, questions, and submission functionality
 */

// Sample quiz data
const sampleQuizzes = [
  {
    id: 1,
    title: "Vòng thi Sơ khảo Cuộc thi Tìm hiểu pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả - Tuần 2",
    subtitle: "Từ ngày 22/10 - 29/10",
    status: "open", // open or closed
    questionsCount: 20,
    timeLimit: 30, // in minutes
    description: "Cuộc thi được tổ chức nhằm nâng cao nhận thức của người dân, đặc biệt là giới trẻ về luật sử dụng năng lượng tiết kiệm và hiệu quả, góp phần phổ biến kiến thức về sử dụng năng lượng bền vững."
  },
  {
    id: 2,
    title: "Vòng thi Sơ khảo Cuộc thi Tìm hiểu pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả - Tuần 1",
    subtitle: "Từ ngày 14/10 - 21/10",
    status: "closed",
    questionsCount: 20,
    timeLimit: 30,
    description: "Cuộc thi được tổ chức nhằm nâng cao nhận thức của người dân về luật sử dụng năng lượng tiết kiệm và hiệu quả."
  }
];

// Sample questions
const sampleQuestions = [
  {
    id: 1,
    question: "Theo Luật Sử dụng năng lượng tiết kiệm và hiệu quả, việc sử dụng năng lượng tiết kiệm và hiệu quả là gì?",
    options: [
      "Là việc sử dụng các loại năng lượng ít hơn nhằm giảm thiểu chi phí và hạn chế các tác động đến môi trường.",
      "Là việc sử dụng vừa đủ các loại năng lượng trong các quá trình sản xuất, sinh hoạt và dịch vụ.",
      "Là việc áp dụng các biện pháp quản lý và kỹ thuật nhằm giảm tổn thất, giảm mức tiêu thụ năng lượng của phương tiện, thiết bị mà vẫn bảo đảm nhu cầu, mục tiêu đặt ra đối với quá trình sản xuất và đời sống."
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Câu hỏi mẫu số 2 về năng lượng tái tạo?",
    options: [
      "Năng lượng mặt trời",
      "Năng lượng gió",
      "Cả hai đều đúng"
    ],
    correctAnswer: 2
  }
  // Add more questions as needed
];

// Sample leaderboard data
const sampleLeaderboard = [
  {
    rank: 1,
    name: "Lê Thị Dạ Thảo",
    correctAnswers: 20,
    attempts: 14,
    completionTime: "00:00:12",
    affiliation: "Trung tâm Điều độ Hệ thống điện miền Trung",
    score: 200
  },
  {
    rank: 2,
    name: "Phạm Thị Thu Hiền",
    correctAnswers: 20,
    attempts: 137,
    completionTime: "00:00:13",
    affiliation: "Trường THCS Quảng Thọ",
    score: 200
  },
  {
    rank: 3,
    name: "Trần Bình Nguyên",
    correctAnswers: 20,
    attempts: 16,
    completionTime: "00:00:13",
    affiliation: "Đội quản lý điện Lai Vung - Công ty Điện lực Đồng Tháp",
    score: 200
  },
  {
    rank: 4,
    name: "Nguyễn Thị Vui",
    correctAnswers: 20,
    attempts: 158,
    completionTime: "00:00:14",
    affiliation: "NH Bắc Á Hà Giang",
    score: 200
  },
  {
    rank: 5,
    name: "Nguyễn Quang Tuyến",
    correctAnswers: 20,
    attempts: 39,
    completionTime: "00:00:14",
    affiliation: "phường Cao Lãnh, tỉnh Đồng Tháp",
    score: 200
  },
  {
    rank: 6,
    name: "Nguyễn Đình Hải",
    correctAnswers: 20,
    attempts: 122,
    completionTime: "00:00:14",
    affiliation: "NHNN khu vực 4",
    score: 200
  }
];

/**
 * Fetch all available quizzes
 * @returns {Promise<Array>} List of quizzes
 */
export const fetchQuizzes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleQuizzes);
    }, 500);
  });
};

/**
 * Fetch questions for a specific quiz
 * @param {number} quizId - The quiz ID
 * @returns {Promise<Array>} List of questions
 */
export const fetchQuestions = async (quizId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate 20 questions dynamically if needed
      const questions = [];
      for (let i = 1; i <= 20; i++) {
        if (i <= sampleQuestions.length) {
          questions.push(sampleQuestions[i - 1]);
        } else {
          questions.push({
            id: i,
            question: `Câu hỏi số ${i} về năng lượng tiết kiệm và hiệu quả?`,
            options: [
              `Đáp án A cho câu ${i}`,
              `Đáp án B cho câu ${i}`,
              `Đáp án C cho câu ${i}`
            ],
            correctAnswer: i % 3
          });
        }
      }
      resolve(questions);
    }, 500);
  });
};

/**
 * Submit quiz answers
 * @param {number} quizId - The quiz ID
 * @param {Object} answers - Object mapping question IDs to selected answers
 * @param {number} timeSpent - Time spent on quiz in seconds
 * @returns {Promise<Object>} Result object with score and details
 */
export const submitAnswers = async (quizId, answers, questions, timeSpent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let correctCount = 0;
      
      questions.forEach((q) => {
        if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      
      const totalQuestions = questions.length;
      const score = Math.round((correctCount / totalQuestions) * 100);
      
      resolve({
        score: score * 10, // Total score points
        totalQuestions: totalQuestions,
        correctAnswers: correctCount,
        percentage: score,
        timeSpent: timeSpent
      });
    }, 500);
  });
};

/**
 * Fetch leaderboard data
 * @returns {Promise<Array>} Leaderboard data
 */
export const fetchLeaderboard = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleLeaderboard);
    }, 500);
  });
};
