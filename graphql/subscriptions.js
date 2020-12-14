/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness {
    onCreateBusiness {
      id
      name
      address
      email
      phone
      lat
      lng
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness {
    onUpdateBusiness {
      id
      name
      address
      email
      phone
      lat
      lng
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness {
    onDeleteBusiness {
      id
      name
      address
      email
      phone
      lat
      lng
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVisit = /* GraphQL */ `
  subscription OnCreateVisit {
    onCreateVisit {
      id
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        email
        phone
        lat
        lng
        visits {
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
        imageId
        visits {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVisit = /* GraphQL */ `
  subscription OnUpdateVisit {
    onUpdateVisit {
      id
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        email
        phone
        lat
        lng
        visits {
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
        imageId
        visits {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVisit = /* GraphQL */ `
  subscription OnDeleteVisit {
    onDeleteVisit {
      id
      hasSymptom
      businessID
      customerID
      business {
        id
        name
        address
        email
        phone
        lat
        lng
        visits {
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
        imageId
        visits {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      firstName
      lastName
      phone
      email
      imageId
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      firstName
      lastName
      phone
      email
      imageId
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      firstName
      lastName
      phone
      email
      imageId
      visits {
        items {
          id
          hasSymptom
          businessID
          customerID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
