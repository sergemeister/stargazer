import { fetchRepositoryLogic, fetchLanguagesLogic } from '../reposDataHandlingLogic'

describe('fetchRepositoryLogic', () => {
  describe('using existing repository name', () => {
    let dispatch

    beforeEach((done) => {
      const httpClient = {
        get(url) {
          return new Promise((resolve, reject) => {
            resolve({
              data: {
                id: 10270250,
                full_name: 'facebook/react',
                stargazers_count: 154386,
                subscribers_count: 6678,
                forks_count: 30270,
                clone_url: "https://github.com/facebook/react.git",
                languages_url: "https://api.github.com/repos/facebook/react/languages"
              }
            })
          })
        }
      }

      dispatch = jest.fn(() => done());
      const action = {
        payload: {
          owner: 'facebook',
          repo: 'react'
        }
      }

      fetchRepositoryLogic.process({ httpClient, action }, dispatch);
    })

    it('should dispatch action GET_REPOSITORY_SUCCESSFUL with repository data', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_REPOSITORY_SUCCESSFUL',
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
     })
  })

  describe('repository not found', () => {
    let dispatch;

    beforeEach((done) => {
      const httpClient = {
        get(url) {
          return new Promise((resolve, reject) => {
            reject(new Error('not found 404'));
          });
        }
      };

      dispatch = jest.fn(() => done());
      const action = {
        payload: {
          owner: 'jasflkja322',
          repo: 'react'
        }
      }

      fetchRepositoryLogic.process({ httpClient, action }, dispatch);
    });

    it('should dispatch action GET_REPOSITORY_FAILURE with error message', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_REPOSITORY_FAILURE',
        payload: "Repository not found"
      })
     });
  });
})
