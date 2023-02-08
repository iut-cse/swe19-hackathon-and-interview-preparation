import testController from './test.controller'

test("it should pass",async () => {
  expect(true).toBe(true)
})

test("square function",async () => {
  const response = await testController.testSqaureFunction(2)
  expect(response).toBe(4)


})