async function test(): Promise<string> {
  return 'test service working'
}


const testSqaureFunction = async (num: number): Promise<number> => {
  return num * num
}

export default { test, testSqaureFunction }