import { fetchRepositoryLogic, fetchLanguagesLogic } from '../reposDataHandlingLogic'
import * as types from '../../../actions/types'

describe('fetchRepositoryLogic', () => {
  describe('transform', () => {
    let reject
    let next

    describe('failure', () => {  
      beforeEach((done) => {
        reject = jest.fn(() => done())
        next = jest.fn(() => done())
        const action = {
          type: types.GET_REPOSITORY,
          payload: 'facebook123'
        }
  
        fetchRepositoryLogic.transform({ action }, next, reject);
      });
  
      it('should dispatch action GET_REPOSITORY_FAILURE with error message', () => {
        expect(reject).toHaveBeenCalledTimes(1)
        expect(reject).toHaveBeenCalledWith({
          type: types.GET_REPOSITORY_FAILURE,
          payload: "Invalid format"
        })
       })
    })

    describe('success', () => { 
      beforeEach((done) => {
        reject = jest.fn(() => done())
        next = jest.fn(() => done())
        const action = {
          type: types.GET_REPOSITORY,
          payload: 'facebook/react'
        }
  
        fetchRepositoryLogic.transform({ action }, next, reject);
      });
  
      it('should dispatch action GET_REPOSITORY', () => {
        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({
          type: types.GET_REPOSITORY,
          payload: {
            owner: 'facebook',
            repo: 'react'
          }
        })
      })
    })
  })

  describe('process', () => {
    describe('success', () => {
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
       })
    })

    describe('failure', () => {
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
          type: types.GET_REPOSITORY_FAILURE,
          payload: "Repository not found"
        })
       });
    });
  })
})

describe('fetchRepositoryLanguagesLogic', () => {
  describe('transform', () => {
    let reject
    let next
  
    describe('success', () => {
      beforeEach((done) => {
        reject = jest.fn(() => done())
        next = jest.fn(() => done())

        const action = {
          type: types.GET_REPOSITORY_LANGUAGES,
          payload: "10270250"
        }

        const getState = () => ({
          repositories: {
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
          }
        })
  
        fetchLanguagesLogic.transform({ action, getState }, next, reject);
      });

      it('should dispatch action GET_REPOSITORY_LANGUAGES', () => {
        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith({
          type: types.GET_REPOSITORY_LANGUAGES,
          payload: {
            id: '10270250',
            languages_url: "https://api.github.com/repos/facebook/react/languages"
          }
        })
      })
    })

    describe('failure', () => {
      beforeEach((done) => {
        reject = jest.fn(() => done())
        next = jest.fn(() => done())
        
        const action = {
          type: types.GET_REPOSITORY_LANGUAGES,
          payload: "10270250"
        }

        const getState = () => ({
          repositories: {
            data: {}
          }
        })
  
        fetchLanguagesLogic.transform({ action, getState }, next, reject);
      });

      it('should reject an action', () => {
        expect(reject).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('process success', () => {
    let dispatch

    beforeEach((done) => {
      const httpClient = {
        get(url) {
          return new Promise((resolve, reject) => {
            resolve({
              data: {
                C: 5225,
                "C++": 44278,
                CSS: 60493,
                CoffeeScript: 16554,
                HTML: 117051,
                JavaScript: 4969579,
                Makefile: 189,
                Python: 259,
                Shell: 3703,
                TypeScript: 19904,
              }
            })
          })
        }
      }

      dispatch = jest.fn(() => done());
      const action = {
        payload: {
          id: 10270250,
          languages_url: 'https://api.github.com/repos/facebook/react/languages'
        }
      }

      fetchLanguagesLogic.process({ httpClient, action }, dispatch);
    })

    it('should dispatch action GET_REPOSITORY_LANGUAGES_SUCCESSFUL with calculated languages stats', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: types.GET_REPOSITORY_LANGUAGES_SUCCESSFUL,
        payload: {
          id: 10270250,
          languages: {
            JavaScript: "94.9%",
            HTML: "2.2%",
            CSS: "1.2%",
            "C++": "0.8%",
            TypeScript: "0.4%",
            CoffeeScript: "0.3%",
            C: "0.1%",
            Shell: "0.1%"
          }
        }
      })
     })
  })
})
