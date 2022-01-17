<div align="center">
  <br/>
  <br/>
  <a href="https://twinlogix.github.io/typetta/">
    <img src="https://github.com/twinlogix/typetta/blob/master/docs/assets/img/logo.png" width="316" height="50">
  </a>
  <br/>
  Node.js ORM written in TypeScript for type lovers.
  <br/>
  <br/>
  <div>
    <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg"/></a>
    <a href="https://www.codacy.com/gh/twinlogix/typetta/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=twinlogix/typetta&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/3c49f8a206cf4deeb41b289d151434f7"/></a>
    <img src="./coverage/badge.svg">
  </div>
  <br/>
  <br/>
</div>

Typetta is an **open-source ORM** written in TypeScript that aims to allow a seamless access to data in a typed fashion to all **main SQL databases** (MySQL, PostgreSQL, Microsoft SQL Server, SQLLite3, CockroachDB, MariaDB, Oracle e Amazon Redshift) and also to the NoSQL database **MongoDB**.

Typetta is pluggable into any TypeScript backend (including serverless applications and microservices) but in terms of gain we totally suggest using it in all **GraphQL** backends, because... because we simply love GraphQL.

# How does Typetta work?

This section provides a high-level overview of how Prisma works and its most important technical components. For a more thorough introduction, visit the Prisma documentation.

You can find plenty of useful informations, guides and tutorials about how to getting started with Typetta in the [official documentation](https://twinlogix.github.io/typetta/).

## Main Functionalities

Here below is a short link of what makes Typetta awesome:

- A complete support of main SQL databases and also MongoDB.
- Multi database, included ability to cross query different databases.
- Multiple connections and connection pooling.
- Entity relations: 1-1, 1-n, n-m.
- Dynamic typing and corresponding data projections.
- Pagination.
- Can be extended using middlewares.
- Customized scalars and serialization on the database.
- Autogenerated IDs
- Validation rules.
- Virtual, computed and calculated fields.
- Aggregation queries.
- Ability to build custom queries.
- Define data access security policies.
- Embedded documents supported on MongoDB as well as on SQL.
- Automated code generation.
- Effortless integration with GraphQL backends.
- Transactions.
- Logging.

## Why Typetta?

Typetta fulfills the need of having a typed ORM connected to SQL and NoSQL databases with **productivity** and **flexibility** in mind.

The philosophy behind Typetta components has been to ensure ease of use and optimization of development time, adding complexity (with direct access to dara source) only when strictly needed.

In case you are still in doubt, why use Typetta instead of other ORMs?

- It's the ONLY TypeScript ORM that has a full support for **SQL and MongoDB databases**.
  
- A very **strict typing** system that 100% leverages TypeScript in providing types as reposes bases on the data type requested.

- Using standard **GraphQL** you can define the model. Using this standard opens the door  to a whole set of instruments and third party frameworks that are based on this standard.