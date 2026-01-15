import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Layout from "./Layout.jsx"
import Home from "./components/Pages/Home.jsx"
import About from "./components/Pages/About.jsx"
import AskQuestion from "./components/Pages/AskQuestions.jsx"
import ContactPage from "./components/Pages/Contact.jsx"
import SingleQuestion from "./components/Pages/SingleQuestion.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "about", element: <About /> },
      { path: "ask", element: <AskQuestion /> },
      { path: "contact", element: <ContactPage /> },
      { path: "question/:questionId", element: <SingleQuestion /> },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
