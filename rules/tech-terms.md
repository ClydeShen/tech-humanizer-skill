# Technical Terminology Whitelist

## Lookup Rule

Any term listed in this file is **exempt from AI marker classification**, even if it also appears in `rules/ai-markers.md`. Before flagging a candidate word as an AI writing marker, check this whitelist first. If the word is present here, do not flag it — regardless of whether it matches a pattern in the AI marker rule library.

---

## Infrastructure

Terms related to systems architecture, deployment, and operations:

- API
- microservices
- monolith
- CI/CD
- pipeline (in the context of build/deploy pipelines)
- latency
- throughput
- canary deployment
- blue-green deployment
- rolling update
- load balancer
- reverse proxy
- service mesh
- sidecar
- container
- Docker
- Kubernetes
- k8s
- pod
- cluster
- node
- orchestration
- autoscaling
- horizontal scaling
- vertical scaling
- CDN
- DNS
- TLS
- SSL
- HTTP
- HTTPS
- REST
- GraphQL
- gRPC
- WebSocket
- webhook
- rate limiting
- circuit breaker
- retry logic
- idempotency
- eventual consistency
- distributed tracing
- observability
- telemetry
- SLA
- SLO
- SLI
- uptime
- downtime
- failover
- disaster recovery
- RTO
- RPO
- on-premise
- cloud-native
- serverless
- edge computing
- IaC (Infrastructure as Code)
- Terraform
- Ansible
- Helm
- GitOps

---

## Data

Terms related to data engineering, storage, and processing:

- schema
- pipeline (in the context of data pipelines)
- ETL
- ELT
- data warehouse
- data lake
- data lakehouse
- OLAP
- OLTP
- relational database
- NoSQL
- SQL
- query
- index
- partition
- sharding
- replication
- migration
- seed data
- ORM
- transaction
- ACID
- CAP theorem
- eventual consistency
- message queue
- event streaming
- Kafka
- Pub/Sub
- batch processing
- stream processing
- data lineage
- data catalog
- feature store
- vector database
- embedding
- normalization
- denormalization
- foreign key
- primary key
- stored procedure
- view (database)
- materialized view

---

## Security

Terms related to authentication, authorization, and security practices:

- OAuth
- OAuth 2.0
- JWT
- JSON Web Token
- zero-trust
- zero-trust architecture
- RBAC
- ABAC
- ACL
- SSO
- SAML
- OpenID Connect
- OIDC
- MFA
- 2FA
- TOTP
- API key
- secret
- secret rotation
- encryption
- decryption
- hashing
- salt
- bcrypt
- AES
- RSA
- TLS (see also Infrastructure)
- mTLS
- certificate
- PKI
- CSRF
- XSS
- SQL injection
- OWASP
- penetration testing
- pen test
- vulnerability
- CVE
- patch
- firewall
- WAF
- DDoS
- intrusion detection
- SIEM
- audit log
- compliance
- GDPR
- SOC 2
- ISO 27001

---

## Software Engineering

Terms related to development practices, patterns, and tooling:

- refactor
- refactoring
- code review
- PR (pull request)
- merge request
- branch
- commit
- rebase
- cherry-pick
- diff
- linter
- formatter
- type system
- static analysis
- unit test
- integration test
- end-to-end test
- E2E test
- test coverage
- mock
- stub
- fixture
- dependency injection
- inversion of control
- design pattern
- SOLID
- DRY
- KISS
- YAGNI
- technical debt
- code smell
- abstraction
- interface
- polymorphism
- inheritance
- encapsulation
- immutability
- side effect
- pure function
- higher-order function
- closure
- async/await
- concurrency
- parallelism
- race condition
- deadlock
- mutex
- semaphore
- garbage collection
- memory leak
- heap
- stack
- runtime
- compile time
- transpile
- bundler
- tree shaking
- hot reload
- monorepo
- polyrepo
- SDK
- CLI
- REPL
- IDE
- debugger
- breakpoint
- profiler
- benchmark

---

## AI / ML

Terms related to machine learning and AI systems:

- model
- training
- inference
- fine-tuning
- prompt
- prompt engineering
- token
- tokenizer
- embedding (see also Data)
- vector
- cosine similarity
- RAG (Retrieval-Augmented Generation)
- LLM
- transformer
- attention mechanism
- hyperparameter
- epoch
- batch size
- learning rate
- overfitting
- underfitting
- regularization
- gradient descent
- backpropagation
- neural network
- convolutional neural network
- CNN
- RNN
- LSTM
- diffusion model
- generative model
- discriminative model
- classification
- regression
- clustering
- feature engineering
- data augmentation
- evaluation metric
- precision
- recall
- F1 score
- AUC
- ROC curve
- confusion matrix
- ground truth
- label
- annotation
- dataset
- benchmark (see also Software Engineering)
- RLHF
- alignment
- hallucination
- context window
- temperature (model parameter)
- top-p
- top-k
