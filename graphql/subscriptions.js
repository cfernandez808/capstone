/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness {
    onCreateBusiness {
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
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness {
    onUpdateBusiness {
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
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness {
    onDeleteBusiness {
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
export const onCreateVisit = /* GraphQL */ `
  subscription OnCreateVisit {
    onCreateVisit {
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
export const onUpdateVisit = /* GraphQL */ `
  subscription OnUpdateVisit {
    onUpdateVisit {
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
export const onDeleteVisit = /* GraphQL */ `
  subscription OnDeleteVisit {
    onDeleteVisit {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
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

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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

export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
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

export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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

export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
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

export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
