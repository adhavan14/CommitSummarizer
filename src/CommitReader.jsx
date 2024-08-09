import {useEffect, useState} from "react";
import axios from "axios";
import  {branchReader} from "./services/GitHubProxy.jsx";

const CommitReader = () => {

    const [commits, setCommits] = useState([])
    const [repositories, setRepositories] = useState([])



    function getCommits() {
        const totalCommits = []
        commits && commits.map((commit) => {
            totalCommits.push(commit.commit.message)
        })
        return totalCommits
    }

    const getSummaryByCommits = async () => {
        const token = 'AIzaSyCyOK7gx-R7839qeVwLR9-iJG2-GUn4tGQ'
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + token
        const body = {"contents":
                [{"parts":[{"text": getCommits() + "give the summary for the above commits in a paragraph"}]}]}

        await axios.post(url, body)
            .then(response=> {
                console.log(response.data.candidates[0].content.parts[0].text)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchCommits = async () => {
         // await getCommitsbyRepo('reactPractice')
        const repos = await branchReader('reactPractice')
        console.log(repos)
        setRepositories(repos)
        // setCommits(result.data)
    }

    useEffect(() => {
        fetchCommits()
    }, []);

    return (<>
        {
            repositories && repositories.map((commit) => {
                return <p key={commit.id}>{commit.name}</p>
            })
        }
        <button onClick={getSummaryByCommits}>generate</button>
    </>)
}

export default CommitReader