import axios from "axios";

const token = import.meta.env.VITE_GITHUB_API_KEY

export const getListOfRepos = async () => {

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const url = 'https://api.github.com/users/adhavan14/repos'
    return await axios.get(url, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getListOfBranches = async (repo) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.github.com/repos/adhavan14/${repo}/branches`

    return await axios.get(url, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getListOfCommits = async (repo, branch) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {sha: branch}
    };
    const url = `https://api.github.com/repos/adhavan14/${repo}/commits`
    return await axios.get(url, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}
