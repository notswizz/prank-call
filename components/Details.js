import { useState, useEffect } from 'react';

const Details = ({ callId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([["", ""]]);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getDetails?callId=${callId}`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching call details:', error);
      }
      setIsLoading(false);
    };

    if (callId) {
      fetchDetails();
    }
  }, [callId]);

  const addQuestionField = () => {
    setQuestions([...questions, ["", ""]]);
  };

  const removeQuestionField = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((item, i) => {
      if (index === i) {
        return [value, "string"]; // Assuming all answers are expected to be strings for simplicity
      }
      return item;
    });
    setQuestions(newQuestions);
  };

  const analyzeCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analyzeCall?callId=${callId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sk-fz74dpfy7lo8t37mjhf798k0h7xw41uetwj3qrm0ztdgxzi8cr1af217a9h57xee69', // Replace with your actual API authorization key
        },
        body: JSON.stringify({
          goal: "Analyze call with questions", // This should be dynamic or pre-determined
          questions: questions
        }),
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing call:', error);
    }
    setIsLoading(false);
  };

  if (!callId) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            details && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Call Details - {details.call_id}</h3>
                <div className="mt-2">
                  <p>Corrected Duration: {details.corrected_duration}</p>
                  <p>End At: {details.end_at}</p>
                  {/* ...other details */}
                </div>
              </>
            )
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Analyze Call</h3>
            <div>
              {questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={question[0]}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                  <button onClick={() => removeQuestionField(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addQuestionField} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
                Add Question
              </button>
              <button onClick={analyzeCall} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                Analyze Call
              </button>
              {analysisResult && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-900">Analysis Result:</h4>
                  <p>Status: {analysisResult.status}</p>
                  <p>Message: {analysisResult.message}</p>
                  {/* Display each answer */}
                  {analysisResult.answers.map((answer, index) => (
                    <p key={index}>Answer {index + 1}: {answer}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
