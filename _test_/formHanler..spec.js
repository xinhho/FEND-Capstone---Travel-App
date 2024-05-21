import { handleSubmitAction } from '../src/client/js/formHandler'
  
describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing the handleSubmitAction() function", () => {
    expect(handleSubmitAction).toBeDefined();
  })
});
