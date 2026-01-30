const claudeClient = require('../config/claudeClient');
const Question = require('../models/Question');

class InterviewService {
  static async generateQuestion(interviewId, difficulty, category, previousAnswers = []) {
    const contextPrompt = previousAnswers.length > 0
      ? `\nPrevious answers quality: ${previousAnswers.map(a => a.quality).join(', ')}`
      : '';

    const prompt = `You are a senior technical interviewer from a top Indian product-based company like TCS, Infosys, Wipro, HCL, or similar.

Generate a ${difficulty} level ${category} question for a Software Engineer (Fresher) role.

${contextPrompt}

Rules:
- If user answered previous questions well, increase difficulty slightly
- If user struggled, ask more foundational questions
- Be specific and practical
- Ask one clear question
- Include space for follow-up questions

Respond in JSON format:
{
  "question": "The main question text",
  "concepts": ["concept1", "concept2"],
  "difficulty": "${difficulty}",
  "timeLimit": 300
}`;

    try {
      const response = await claudeClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse question response');
      }

      const questionData = JSON.parse(jsonMatch[0]);

      const newQuestion = new Question({
        interviewId,
        questionText: questionData.question,
        category,
        difficulty,
        expectedConceptsCovered: questionData.concepts || [],
        sequenceNumber: 1,
      });

      await newQuestion.save();
      return newQuestion;
    } catch (error) {
      console.error('Error generating question:', error.message);
      throw error;
    }
  }

  static async evaluateAnswer(question, answer, userProfile = {}) {
    const prompt = `You are a senior technical interviewer evaluating a candidate's response.

Question: ${question.questionText}
Expected Concepts: ${question.expectedConceptsCovered.join(', ')}

Candidate's Answer: "${answer}"

Evaluate the answer on these criteria (0-100):
1. Correctness - How accurate and complete is the solution?
2. Clarity - How well is it explained?
3. Completeness - Does it cover all aspects?
4. Efficiency - Is the approach optimal?

Provide feedback and score.

Respond in JSON format:
{
  "correctness": 85,
  "clarity": 78,
  "completeness": 82,
  "efficiency": 80,
  "feedback": "Good understanding of concepts. The solution is mostly correct but...",
  "improvements": ["improvement1", "improvement2"],
  "followUp": "Can you explain why you chose this approach?",
  "confidenceDetected": "High"
}`;

    try {
      const response = await claudeClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse evaluation response');
      }

      const evaluation = JSON.parse(jsonMatch[0]);
      return evaluation;
    } catch (error) {
      console.error('Error evaluating answer:', error.message);
      throw error;
    }
  }

  static async generateFinalFeedback(answers, scores) {
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    const prompt = `Based on interview performance with average score of ${averageScore}/100:
Scores: ${scores.join(', ')}

Generate constructive feedback for a Software Engineer Fresher candidate.

Include:
1. Overall Assessment
2. Key Strengths
3. Areas for Improvement
4. Learning Recommendations
5. Confidence Level

Respond in JSON format:
{
  "overallAssessment": "text",
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "confidenceLevel": "Medium"
}`;

    try {
      const response = await claudeClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse feedback response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating feedback:', error.message);
      throw error;
    }
  }
}

module.exports = InterviewService;
