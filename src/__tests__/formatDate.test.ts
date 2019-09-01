import formatDate from '../lib/formatDate';
import {GitlabIssue} from '../components/LandingPage';

const mockResponses: Array<GitlabIssue> = [
  {
    number: 16629,
    title: "Can't use instance values without refs",
    labels: [],
    state: "open",
    created_at: "2019-08-31T14:31:51Z",
    updated_at: "2019-08-31T14:39:19Z"
  }
];
describe('formatDate', () => {
  it('formats date as expected', () => {
    const mockResponse = mockResponses[0];
    expect(formatDate(mockResponse.created_at)).toEqual('August 31, 2019, 10:31:51 EDT')
    expect(formatDate(mockResponse.updated_at)).toEqual("August 31, 2019, 10:39:19 EDT")
  })
})