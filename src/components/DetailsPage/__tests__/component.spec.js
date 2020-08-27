import React from 'react'
import { shallow } from 'enzyme'
import DetailsPage from '../component'
import { repositoryData } from '../../../redux/selectors'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: "10270250",
  })
}))

jest.mock('../../../redux/selectors', () => ({
  repositoryData: jest.fn(fn => fn())
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
 
describe('DetailsPage', () => {
  let component; 

  it('should render correctly', () => {
    repositoryData.mockImplementation(() => () => ({
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
        CSS: "1.2%",
        "C++": "0.8%",
        TypeScript: "0.4%",
        CoffeeScript: "0.3%",
        C: "0.1%",
        Shell: "0.1%"
      }
    }))

    component = shallow(
      <DetailsPage />
    )
    expect(component).toMatchSnapshot()
  })

  afterEach(() => {
    component.unmount()
  })
});
