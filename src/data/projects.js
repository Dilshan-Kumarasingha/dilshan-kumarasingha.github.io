// Only facts I can show in the repos and explain in an interview.
export const projects = [
  {
    id: 'helpdeskhq-platform',
    name: 'HelpDeskHQ Platform',
    tagline: 'A helpdesk app built DevOps-first.',
    narrative:
      'I built a helpdesk app and then the delivery system around it. The goal was to show how code gets built, tested, packaged and run, not to pile on features.',
    status: 'development',
    highlights: [
      '.NET 10 REST API with PostgreSQL, JWT login, role-based access and a Hangfire job that escalates tickets past their SLA',
      'Multi-stage Docker images that run as non-root users',
      'Docker Compose starts the database, a migration container, the API and an nginx reverse proxy in the right order',
      'GitHub Actions on every pull request: builds and tests the API (xUnit), builds the frontend and builds all three Docker images',
      'Liveness and readiness health endpoints, with secrets kept out of Git',
      'Next: Kubernetes (kind), Terraform, Prometheus and Grafana',
    ],
    stack: ['C#', '.NET 10', 'PostgreSQL', 'React', 'Docker', 'Docker Compose', 'GitHub Actions', 'nginx', 'xUnit'],
    links: { repository: 'https://github.com/Dilshan-Kumarasingha/helpdeskhq-platform' },
  },
  {
    id: 'shopqa',
    name: 'ShopQA',
    tagline: 'Automated testing for an e-commerce app.',
    narrative:
      'A test suite that checks the UI, the API and the database, and runs on every push so a broken change shows up straight away.',
    status: 'shipped',
    highlights: [
      'UI tests with Selenium and API tests with RestAssured',
      'Database checks with JDBC',
      'GitHub Actions pipeline that runs everything on every push',
      'Allure reports for each run',
    ],
    stack: ['Java', 'Selenium', 'RestAssured', 'JDBC', 'Allure', 'GitHub Actions'],
    links: { repository: 'https://github.com/Dilshan-Kumarasingha/shopqa-ecommerce' },
  },
  {
    id: 'flowspace',
    name: 'Flowspace',
    tagline: 'Async standups and a decision log for teams.',
    narrative:
      'A full-stack app that replaces daily standup meetings and keeps team decisions from getting lost.',
    status: 'shipped',
    highlights: [
      'Role-based access (Owner, Lead, Member) with JWT login and time-limited invite codes',
      'Live standup feed and blocker flagging over SignalR',
      'PostgreSQL schema of 9 tables with Entity Framework Core',
      'Automated API, UI and database tests running in CI',
    ],
    stack: ['.NET 10', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'SignalR'],
    links: { repository: 'https://github.com/Dilshan-Kumarasingha/flowspace' },
  },
  {
    id: 'tradex',
    name: 'TradeX',
    tagline: 'A desktop POS system sold to a retail client.',
    narrative:
      'A trading and inventory system for a small business, covering sales, customers, products, employees, expenses and payroll.',
    status: 'shipped',
    highlights: [
      'Machine-bound licensing with AES-encrypted keys, expiry dates and a separate key generator',
      'Role-based users (Admin and staff) with secure password hashing',
      'Built-in database backup',
      'Layered architecture with the repository pattern, now being rebuilt in PostgreSQL with Clean Architecture',
    ],
    stack: ['C#', '.NET WinForms', 'MySQL', 'AES encryption'],
    links: { repository: 'https://github.com/Dilshan-Kumarasingha/TradeX' },
  },
]