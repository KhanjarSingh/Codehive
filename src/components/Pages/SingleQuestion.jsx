"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

export default function SingleQuestion() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/questions/${id}`)

        if (!res.ok) {
          throw new Error("Question not found")
        }

        const data = await res.json()
        setQuestion(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching question:", err)
        setError("Failed to fetch the question. It may not exist.")
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="container p-4 text-center">
        <div className="spinner mx-auto mb-4 border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
        <p className="text-gray-600">Loading question...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Questions
        </button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">← Back to Questions</Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

        <div className="text-sm text-gray-500 mb-4">
          <span>Asked on {formatDate(question.time)} by {question.user}</span>
          <span className="ml-4">{question.views || 0} views</span>
        </div>

        <div className="mb-4">
          <p>{question.snippet}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags?.map((tag, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <button className="bg-green-100 text-green-800 px-3 py-1 rounded">▲ Upvote ({question.votes || 0})</button>
          <button className="bg-red-100 text-red-800 px-3 py-1 rounded">▼ Downvote</button>
          <button className="bg-gray-100 px-3 py-1 rounded">Share</button>
          <button className="bg-gray-100 px-3 py-1 rounded">Report</button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">{question.answers || 0} Answers</h2>
        {(!question.answers || question.answers === 0) && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
            <p>No answers yet. Be the first to answer this question!</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white shadow p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
        <form>
          <textarea rows="8" className="w-full border border-gray-300 p-3 rounded mb-4" placeholder="Write your answer here..."></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  )
}
