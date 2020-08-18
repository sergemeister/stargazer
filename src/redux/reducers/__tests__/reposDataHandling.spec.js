import reducer from '../reposDataHandling'
import * as types from '../../../actions/types'

describe('reposDataHandling reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: {},
      error: null
    })
  })


  it('should handle GET_REPOSITORY_SUCCESSFUL', () => {
    expect(
      reducer({}, {
        type: types.GET_REPOSITORY_SUCCESSFUL,
        payload: {
          id: 10270250,
          full_name: "facebook/react",
          stargazers_count: 154386,
          subscribers_count: 6678,
          forks_count: 30270,
          clone_url: "https://github.com/facebook/react.git",
          languages_url: "https://api.github.com/repos/facebook/react/languages"
        }
      })
    ).toEqual({
      data: {
        "10270250": {
          id: 10270250,
          full_name: "facebook/react",
          stargazers_count: 154386,
          subscribers_count: 6678,
          forks_count: 30270,
          clone_url: "https://github.com/facebook/react.git",
          languages_url: "https://api.github.com/repos/facebook/react/languages" 
        }
      },
      error: null
    })
  })

  it('should handle GET_REPOSITORY_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.GET_REPOSITORY_FAILURE,
        payload: 'Repository not found'
      })
    ).toEqual({
      error: "Repository not found"
    })
  })
})

it('should handle GET_REPOSITORY_LANGUAGES_SUCCESSFUL', () => {
  expect(
    reducer({
      data: {
        "10270250": {
          id: 10270250,
          full_name: "facebook/react",
          stargazers_count: 154386,
          subscribers_count: 6678,
          forks_count: 30270,
          clone_url: "https://github.com/facebook/react.git",
          languages_url: "https://api.github.com/repos/facebook/react/languages" 
        }
      }
    }, {
      type: types.GET_REPOSITORY_LANGUAGES_SUCCESSFUL,
      payload: {
        id: "10270250",
        languages: {
          JavaScript: "94.9%",
          HTML: "2.2%",
          CSS :"1.2%"
        }
      }
    })
  ).toEqual({
    data: {
      "10270250": {
        id: 10270250,
        full_name: "facebook/react",
        stargazers_count: 154386,
        subscribers_count: 6678,
        forks_count: 30270,
        clone_url: "https://github.com/facebook/react.git",
        languages_url: "https://api.github.com/repos/facebook/react/languages",
        languages: {
          JavaScript: "94.9%",
          HTML: "2.2%",
          CSS: "1.2%"     
        }
      }
    }
  })
})

  it('should handle REMOVE_REPOSITORY', () => {
    expect(
      reducer({
        data: {
          "10270250": {
            "id": 10270250,
            "full_name": "facebook/react",
            "stargazers_count": 154386,
            "subscribers_count": 6678,
            "forks_count": 30270,
            "clone_url": "https://github.com/facebook/react.git",
            "languages_url": "https://api.github.com/repos/facebook/react/languages" 
          },
          "11730342": {
            id: 11730342,
            full_name: "vuejs/vue",
            stargazers_count: 170286,
            subscribers_count: 6258,
            forks_count: 26075,
            clone_url: "https://github.com/vuejs/vue.git",
            languages_url: "https://api.github.com/repos/vuejs/vue/languages"
          }
        }
      }, {
        type: types.REMOVE_REPOSITORY,
        payload: "11730342"
      })
    ).toEqual({
      data: {
        "10270250": {
          "id": 10270250,
          "full_name": "facebook/react",
          "stargazers_count": 154386,
          "subscribers_count": 6678,
          "forks_count": 30270,
          "clone_url": "https://github.com/facebook/react.git",
          "languages_url": "https://api.github.com/repos/facebook/react/languages",
        }
      }
    })
})
