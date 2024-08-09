import axios from "axios";

export const getSummaryByCommits = async (commits) => {

    const token = import.meta.env.VITE_GEMINI_API_KEY
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + token
    const body = {"contents":
            [{"parts":[{"text": commits + "give the summary for the above commits in a paragraph"}]}]}

    return await axios.post(url, body)
        .then(response=> {
            return (response.data.candidates[0].content.parts[0].text)
        })
        .catch(error => {
            return error
        })
}