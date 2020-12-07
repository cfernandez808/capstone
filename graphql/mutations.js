/* eslint-disable */
// this is an auto generated file. This will be overwritten


export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
      id
      name
      address
      phone
      visitors {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
      id
      name
      address
      phone
      visitors {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBusiness = /* GraphQL */ `
  mutation DeleteBusiness(
    $input: DeleteBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    deleteBusiness(input: $input, condition: $condition) {
      id
      name
      address
      phone
      visitors {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createVisit = /* GraphQL */ `
  mutation CreateVisit(
    $input: CreateVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    createVisit(input: $input, condition: $condition) {
      id
      createdAt
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        phone
        visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer {
        id
        firstName
        lastName
        phone
        email
        collectionId
        businesses {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateVisit = /* GraphQL */ `
  mutation UpdateVisit(
    $input: UpdateVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    updateVisit(input: $input, condition: $condition) {
      id
      createdAt
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        phone
        visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer {
        id
        firstName
        lastName
        phone
        email
        collectionId
        businesses {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteVisit = /* GraphQL */ `
  mutation DeleteVisit(
    $input: DeleteVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    deleteVisit(input: $input, condition: $condition) {
      id
      createdAt
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        phone
        visitors {
          nextToken
        }
        createdAt
        updatedAt
      }
      customer {
        id
        firstName
        lastName
        phone
        email
        collectionId
        businesses {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      collectionId
      businesses {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      ImageId
      firstName
      lastName
      phone
      createdAt
      updatedAt
    }
  }
`;

export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      collectionId
      businesses {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      ImageId
      firstName
      lastName
      phone
      createdAt
      updatedAt
    }
  }
`;

export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      collectionId
      businesses {
        items {
          id
          createdAt
          hasSymptom
          businessID
          customerID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      ImageId
      firstName
      lastName
      phone
      createdAt
      updatedAt
    }
  }
`;
