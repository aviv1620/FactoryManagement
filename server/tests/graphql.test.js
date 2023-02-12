const {request} = require('../tests/graphqlRequest')

let token
let departmentID
let shiftDate
let shiftId
let employeeID

test('authentication - login and get token',async () => {   
    const variables = 
    {
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info"
    }

    const res = await request('login',variables)

    expect(res.errors).not.toBeDefined()

    token = res.data.userLogin.accessToken

    expect(token).toBeDefined()
})

test('authentication - get user',async () => {   
    const variables = 
    {
        token:token
    }

    const res = await request('getUser',variables)    
    
    expect(res.errors).not.toBeDefined()

    const expected = res.data.getUser

    expect(expected).toBeDefined()
    
    expect(expected.name).toBeDefined()    
})

test('authentication - get all users',async () => {   
    const variables = 
    {
        token:token
    }

    const res = await request('getAllUsers',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getAllUsers

    expect(expected).toBeDefined()
    expect(expected).not.toBe({})
    expect(expected).not.toBe(null)
    expect(expected).not.toHaveLength(0)

})

test('Department - create department',async () => {   
    const variables = 
    {
        token:token,
        departmentName:'taxationTest'
    }

    const res = await request('createDepartment',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.createDepartment

    expect(expected).toBe('created')
})


test('Department - get All Departments',async () => {  
    const variables = 
    {
        token:token,        
    }

    const res = await request('getAllDepartments',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getAllDepartments.find((d)=>d.name === 'taxationTest')

    departmentID = expected.id
    expect(expected.name).toBe('taxationTest')
})

test('Department - get All Departments References',async () => {  
    const variables = 
    {
        token:token,        
    }

    const res = await request('getAllDepartmentsReferences',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getAllDepartmentsReferences.find((d)=>d.name === 'taxationTest')

    expect(expected.name).toBe('taxationTest')
})

test(`Department - get department`,async () => {  
    const variables = 
    {
        token:token,   
        departmentID     
    }

    const res = await request('getDepartment',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getDepartment

    expect(expected.name).toBeDefined()
})

test('Department - update department',async () => {  
    const variables = 
    {
        token:token, 
        departmentID:departmentID, 
        department:{
            name:'taxationTestA'
        }
    }

    const res = await request('updateDepartment',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.updateDepartment

    expect(expected).toBe('updated')
})


test('Department - error when update department with wrong ID',async () => {  
    const variables = 
    {
        token:token, 
        departmentID:"73e2b272493e506a88646d45", 
        department:{
            name:'taxationTestA'
        }
    }

    const res = await request('updateDepartment',variables)

    expect(res.errors).toBeDefined()
})

test('shift - create shift',async () => { 
    shiftDate = new Date().toISOString()

    const variables = {
        token:token, 
        shift:{
            date: shiftDate,
            startingHour:9,
            endingHour:17
        }
    }

    const res = await request('createShift',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.createShift

    expect(expected).toBe('created')

})

test('shift - get All Shifts',async () => { 

    const variables = {
        token:token,         
    }

    const res = await request('getAllShifts',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getAllShifts.find((s) => s.date === shiftDate)

    expect(expected).toBeDefined()
    expect(expected.id).toBeDefined()

    shiftId = expected.id
})

test('shift - update Shift',async () => { 
    const variables = {
        shiftID:shiftId,
        token:token,         
    }

    const res = await request('updateShift',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.updateShift

    expect(expected).toBe('updated')
})

test('employees - create employee',async () => { 
   
    const variables = {   
        token:token, 
        employee:{            
            firstName:'aviv',
            lastName:'V',
            departmentID:departmentID,
        }       
    }
   
    const res = await request('createEmployee',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.createEmployee

    expect(expected).toBe('created')
})

test('employees - get all employees',async () => { 

    const variables = {   
        token:token, 
        employeesFilter:{
            departmentId:departmentID
        }
    }

    const res = await request('getAllEmployees',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getAllEmployees.find((em) => em.departmentID == departmentID)

    expect(expected).toBeDefined()

    employeeID = expected.id
})

test('employees - get all employees references',async () => { 

    const variables = {   
        token:token, 
        employeesFilter:{
            departmentId:departmentID
        }
    }

    const res = await request('getAllEmployeesReferences',variables)

    expect(res.errors).not.toBeDefined()      

    const expected = res.data.getAllEmployeesReferences.find((em) => em.department.id == departmentID)    

    expect(expected.department.name).toBeDefined()
    
})

test('employees - get all employees references',async () => { 

    const variables = {   
        token:token, 
        employeesFilter:{
            departmentId:departmentID
        }
    }

    const res = await request('getAllEmployeesReferences',variables)

    expect(res.errors).not.toBeDefined()      

    const expected = res.data.getAllEmployeesReferences.find((em) => em.department.id == departmentID)    

    expect(expected.department.name).toBeDefined()
    
})

test('employees - get employee',async () => { 

    const variables = {   
        token:token, 
        employeeID:employeeID
    }

    const res = await request('getEmployee',variables)

    expect(res.errors).not.toBeDefined()   

    const expected = res.data.getEmployee

    expect(expected).toBeDefined()
    expect(expected.firstName).toBeDefined()
})

test('employees - update employee',async () => { 

    const variables = {   
        token:token, 
        employeeID:employeeID,
        employee:{
            firstName:'Aviv'
        }        
    }

    const res = await request('updateEmployee',variables)

    expect(res.errors).not.toBeDefined()   

    const expected = res.data.updateEmployee

    expect(expected).toBe('updated')
})

test('employees - allocate employee shift',async () => { 
    const variables = {   
        shiftID:shiftId,
        employeeID:employeeID,
        token
    }

    const res = await request('allocateEmployeeShift',variables)

    expect(res.errors).not.toBeDefined()   

    const expected = res.data.allocateEmployeeShift

    expect(expected).toBe('allocated')
})

test("employees - employee can't allocate to same shift",async () => { 
    const variables = {   
        shiftID:shiftId,
        employeeID:employeeID,
        token
    }

    const res = await request('allocateEmployeeShift',variables)

    expect(res.errors).toBeDefined()   
})

test('test reference - allocate employee department',async () => { 
    const variables = 
    {
        departmentID:departmentID,
        employeeID:employeeID,
        token:token,                  
    }

    const res = await request('allocateEmployeeDepartment',variables)

    expect(res.errors).not.toBeDefined() 
    
    const expected = res.data.allocateEmployeeDepartment

    expect(expected).toBe('allocated')
})

test('test reference - update employee manage the department',async () => { 

    const variables = 
    {
        department:{
            managerID:employeeID
        },
        departmentID:departmentID,        
        token:token,                  
    }

    const res = await request('UpdateDepartment',variables)

    expect(res.errors).not.toBeDefined() 

    const expected = res.data.updateDepartment

    expect(expected).toBe('updated')    
})

test(`test reference - get department references find the employee`,async () => {  
    const variables = 
    {
        token:token,   
        departmentID     
    }

    const res = await request('getDepartmentReferences',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.getDepartmentReferences

    expect(expected.manager).toBeDefined()
    expect(expected.manager.firstName).toBeDefined()
})

test('delete data - delete employee',async () => { 
    const variables = 
    {
        token:token, 
        employeeID:employeeID,         
    }

    const res = await request('deleteEmployee',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.deleteEmployee

    expect(expected).toBe('deleted')
})

test('test reference - The fired employee not manage the department',async () => { 
    const variables = {
        token:token
    }

    const res = await request('getAllDepartments',variables)

    expect(res.errors).not.toBeDefined()

    const date = res.data.getAllDepartments

    expect(date).toBeDefined()

    const department = date.find((d)=>d.id === departmentID)

    expect(department).toBeDefined()

    const managerID = department.managerID
    
    expect(managerID).toBeFalsy()
    
})

test('delete data - delete Department',async () => {  
    const variables = 
    {
        token:token, 
        departmentID:departmentID,         
    }

    
    const res = await request('deleteDepartment',variables)

    expect(res.errors).not.toBeDefined()

    const expected = res.data.deleteDepartment

    expect(expected).toBe('deleted')
})