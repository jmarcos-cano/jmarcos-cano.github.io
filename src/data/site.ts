// All page content lives here. Edit this file to change the text; the components only handle layout.

export const profile = {
  name: 'Jairo Marcos Cano',
  kicker: 'Platform engineering · Guatemala City',
  thesis: 'I build the cloud platforms other engineers deploy onto.',
  intro:
    'Senior Platform Engineer with more than 12 years in infrastructure, DevOps and cloud. At <strong>Geotab</strong> I own the infrastructure for the Routing and Optimization domain on the company-wide Google Cloud and GKE platform: Terraform modules, infrastructure as code and lifecycle. Before that I rebuilt delivery pipelines, taught computer science, and ran bootcamps for banks and global IT firms.',
  linkedin: 'https://www.linkedin.com/in/marcos-cano-804a1787',
  linkedinLabel: 'linkedin.com/in/marcos-cano-804a1787',
  email: 'jmarcos.cano@gmail.com',
  tagline: 'Open to platform engineering and DevOps roles.',
  title: 'Jairo Marcos Cano, Platform Engineer',
  description:
    'Portfolio of Jairo Marcos Cano, Senior Platform Engineer: GKE, Terraform, GitOps and cloud cost work.',
};

export type Case = {
  title: string;
  facts: { value: string; label: string }[];
  problem: string;
  approach: string;
  outcome: string;
  chips: string[];
  flow?: boolean; // show the generic platform diagram under this case
};

export const work = {
  heading: 'Selected work',
  label: 'Geotab · 2019 – present',
  intro:
    'The code and internal systems stay at the company. These write-ups cover the problem, the decisions and the outcome, with system names generalized.',
  cases: [
    {
      title: 'Leaving the data center for GKE',
      facts: [
        { value: '6', label: 'GKE clusters, US / EU / Asia' },
        { value: '44', label: 'services on the platform' },
      ],
      problem:
        'A routing and optimization domain ran on legacy hosting split between on-premises data centers and AWS, as larger applications that were hard to scale and release independently.',
      approach:
        'I led the move in two stages. First a lift-and-shift to Google Cloud to get out of the old hosting. Then a re-platform until every workload ran as its own microservice on GKE, provisioned with Terraform.',
      outcome:
        'The domain runs fully cloud native across three regions, with each service scaling from dozens to hundreds of nodes as load requires.',
      chips: ['GKE', 'Terraform', 'Helm', 'Microservices'],
    },
    {
      title: 'The whole domain as code',
      facts: [{ value: '100%', label: 'of changes reviewed in Git' }],
      problem:
        'Infrastructure for dozens of services across several regions needs to look the same everywhere, and every change needs an owner and a record.',
      approach:
        'Reusable Terraform modules define the building blocks. Terragrunt manages each environment on top of them. Helm charts describe every service, and Argo CD applies them, so Git is the only way a change reaches an environment.',
      outcome:
        'Every change to every environment is made and reviewed through Git. New environments and services come from the same modules instead of hand-built copies.',
      chips: ['Terraform', 'Terragrunt', 'Helm', 'Argo CD', 'GitOps'],
      flow: true,
    },
    {
      title: 'Cutting cloud cost by a third',
      facts: [{ value: '−34%', label: 'Google Cloud cost, 2026' }],
      problem:
        'A domain that scales to hundreds of nodes per service can spend a lot on Google Cloud, and the bill needs an owner.',
      approach:
        "I took on governance for the domain's infrastructure. Because everything is defined in Terraform and deployed through Argo CD, a cost change goes through the same pull request flow as any other change, so it is reviewed, rolled out gradually and can be reverted.",
      outcome: 'Google Cloud costs for the domain fell by 34% in 2026.',
      chips: ['FinOps', 'Governance', 'GCP'],
    },
  ] satisfies Case[],
};

export const flow = {
  label:
    'Generic platform flow: a pull request in Git is applied by Terraform and Terragrunt to Google Cloud, and by Argo CD with Helm to the GKE clusters.',
  note: 'Generic diagram of the pattern. No internal system names.',
  nodes: [
    { tag: 'GIT', text: 'Pull request, review, merge' },
    { tag: 'TERRAGRUNT', text: 'Environment config on shared Terraform modules' },
    { tag: 'ARGO CD', text: 'Syncs Helm charts for each service' },
    { tag: 'GKE', text: 'Clusters in US, Europe and Asia' },
  ],
};

export type Item = { kicker: string; title: string; text: string };

export const earlier = {
  heading: 'Earlier work',
  label: 'Mobi / BSM Technologies · 2017 – 2019',
  items: [
    {
      kicker: 'Delivery pipeline',
      title: 'Weeks to hours',
      text: 'Rebuilt the delivery pipeline in under 8 months. The result was one-click deployments to any environment and a business that decides when and what to release. Release lead time dropped from weeks to hours.',
    },
    {
      kicker: 'Containerization',
      title: '48+ applications, 16+ clusters',
      text: 'Moved more than 48 monolith-style applications to independently deployable services on Docker Swarm, across more than 16 multi-AZ clusters, with approvals and releases through Octopus Deploy.',
    },
  ] satisfies Item[],
};

export const teaching = {
  heading: 'Teaching and community',
  label: '2018 – 2024',
  items: [
    {
      kicker: 'Universidad Francisco Marroquín · 2018 – 2020',
      title: 'Computer science instructor',
      text: 'Taught computer science to undergraduates in Guatemala City.',
    },
    {
      kicker: 'Docker Guatemala',
      title: 'Community lead',
      text: 'Led the local Docker community and received an honorable mention for community leadership at DockerCon 2020.',
    },
    {
      kicker: 'kontinu.io · 2020 – 2024',
      title: 'Bootcamps for banks and IT firms',
      text: "Founded a consultancy that ran cloud-native, DevOps and Extreme Programming bootcamps for two of Guatemala's largest banks and a global customer-experience and IT services company, including sessions that taught HR and recruiting teams how engineering roles work.",
    },
    {
      kicker: 'Contract work',
      title: 'Healthcare platforms',
      text: 'Led DevOps and cloud engineering as a contractor for Olinqua in Australia on Azure, and for DXC Technology and Dedalus on OpenShift.',
    },
  ] satisfies Item[],
};

export const stack = {
  heading: 'Stack',
  rows: [
    ['Cloud', 'Google Cloud (GKE), Microsoft Azure (Landing Zones), AWS'],
    ['Infrastructure as code', 'Terraform, Terragrunt, reusable module design'],
    ['Kubernetes and GitOps', 'Kubernetes, GKE, OpenShift, Helm, Argo CD, Docker'],
    ['CI/CD', 'GitLab CI, Jenkins, Octopus Deploy, Ansible, Chef'],
    ['AI-assisted engineering', 'Orchestrating local and cloud AI agents for infrastructure and platform work'],
    ['Programming', 'Go, Python, Node.js, Bash, Java, C'],
  ] as [string, string][],
};

// Set to `null` to hide the block once the repo exists (then add the link here).
export const wip: { title: string; text: string; bullets: string[] } | null = {
  title: 'Reference platform on GitHub',
  text: 'A small public repo that rebuilds the patterns above from scratch, with no company code:',
  bullets: [
    'A Terraform module for a GKE cluster',
    'Argo CD managing a sample service through Helm',
    'A policy-as-code guardrail that blocks an unsafe change before it merges',
    'Cost labels on every resource',
  ],
};
