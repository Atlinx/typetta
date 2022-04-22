<div align="center">
  <br/>
  <br/>
  <a href="https://twinlogix.github.io/typetta/">
    <img src="https://raw.githubusercontent.com/twinlogix/typetta/master/docs/assets/img/logo.png" width="316" height="50">
  </a>
  <br/>
  Node.js ORM written in TypeScript for type lovers.
  <br/>
  <br/>
  <div>
    <a href="https://www.npmjs.com/package/@twinlogix/typetta" target="_blank"><img src="https://badge.fury.io/js/@twinlogix%2Ftypetta.svg" /></a>
    <a href="https://opensource.org/licenses/Apache-2.0" target="_blank"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg"/></a>
    <img src="https://github.com/twinlogix/typetta/actions/workflows/build-and-test.yml/badge.svg" />    
    <a href="https://www.codacy.com/gh/twinlogix/typetta/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=twinlogix/typetta&amp;utm_campaign=Badge_Grade" target="_blank"><img alt="Codacy grade" src="https://img.shields.io/codacy/grade/3c49f8a206cf4deeb41b289d151434f7"></a>
    <img src="https://raw.githubusercontent.com/twinlogix/typetta/master/coverage/badge.svg" />
    <a href="https://discord.com/channels/949666776030003220" target="_blank"><img src="https://img.shields.io/discord/949666776030003220?label=discord"/></a> 
  </div>
  <br/>
  <br/>
</div>

Typetta is an **open-source ORM** written in TypeScript that aims to allow seamless access to data in a typed fashion to all **main SQL databases** (MySQL, PostgreSQL, Microsoft SQL Server, SQLLite3, CockroachDB, MariaDB, Oracle e Amazon Redshift) and also to the NoSQL database **MongoDB**.


Typetta is pluggable into any TypeScript backend (including serverless applications and microservices) but in terms of gain we totally suggest using it in all **GraphQL** backends, because... because we simply love GraphQL.

## How do I use Typetta?
With Typetta everything revolves around the *data model*, the entities that describe the application domain and all underlying relationships between them. This model is described in standard GraphQL, using all basic concepts (scalars, types, enumerations, etc...) and some custom directives.

Starting from the model output of the domain analysis, Typetta provides a range of code generators for:

- Type definitions in TypeScript language for each entity in the model.

- Data Access Object (aka DAO) for each entity type that has a corresponding data source. Each DAO is an object that the developer can also query with advanced CRUD operations.

- A DAOContext, a contextual object where the developer can configure each data source and retrieve the reference of any DAO.

## Main Functionalities

Below is a brief description of what makes Typetta awesome:

- Complete support of main SQL databases and also MongoDB.
- Multiple databases, including the ability to cross query different databases.
- Multiple connections and connection pooling.
- Entity relationships: 1-1, 1-n, n-m.
- Dynamic typing and corresponding data projections.
- Pagination.
- Can be extended using middlewares.
- Customised scalars and serialisation of the database.
- Autogenerated IDs.
- Validation rules.
- Virtual, computed and calculated fields.
- Aggregation queries.
- Ability to build custom queries.
- Define data access security policies.
- Embedded documents supported on MongoDB as well as SQL.
- Automated code generation.
- Effortless integration with GraphQL backends.
- Transactions.
- Logging.
- Mocking.
- Auditing.
- Multi-tenancy partitioning.
- Soft-delete.

## Why Typetta?

Typetta fulfills the need of having a typed ORM connected to SQL and NoSQL databases designed with **productivity** and **flexibility** in mind.

The philosophy behind Typetta components has been to ensure ease of use and optimisation of development time, adding complexity (with direct access to data source) only when strictly needed.

In case you are still unsure, why use Typetta instead of other ORMs?

- It's the ONLY TypeScript ORM that has full support for **SQL and MongoDB databases**.

- A very **strict typing** system that 100% leverages TypeScript in providing types as responses based on the requested data type.

- Using standard **GraphQL** as data modeling language opens the door to a whole set of instruments and third party tools.
