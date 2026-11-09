// All page content lives here. Edit this file to change the text; the components only handle layout.

export const profile = {
  name: 'Jairo Marcos Cano',
  location: 'Guatemala City',
  thesis: 'I build the cloud platforms other engineers deploy onto.',
  thesisHighlight: 'cloud platforms', // wrapped in a highlight in the hero headline
  short:
    'Senior Platform Engineer at Geotab. I run the infrastructure for the Routing and Optimization domain on the company-wide Google Cloud platform.',
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

// A fact can carry a small drawing that explains the number. It animates in on scroll and is static with reduced motion.
export type FactViz =
  | { kind: 'regions'; groups: string[]; per: number } // clusters per region
  | { kind: 'cells' } // one cell per unit of the value
  | { kind: 'compare'; before: string; after: string; ratio: number } // two dimension lines, after = ratio of before
  | { kind: 'span'; from: string; to: string }; // one dimension line across the full width
export type Fact = { value: string; label: string; viz?: FactViz };

export type Case = {
  where?: string; // employer line, shown once at the start of a group of cases
  title: string;
  facts: Fact[];
  problem: string;
  approach: string;
  outcome: string;
  chips: string[];
  flow?: boolean; // show the generic platform diagram under this case
};

export const work = {
  heading: 'Selected work',
  intro:
    'The code and internal systems stay at the company. These write-ups cover the problem, the decisions and the outcome, with system names generalized.',
  cases: [
    {
      where: 'Geotab, Senior Platform Engineer, 2019 - present',
      title: 'Leaving the data center for GKE',
      facts: [
        { value: '6', label: 'GKE clusters, US / EU / Asia', viz: { kind: 'regions', groups: ['US', 'EU', 'Asia'], per: 2 } },
        { value: '44', label: 'services on the platform', viz: { kind: 'cells' } },
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
      facts: [{ value: '100%', label: 'of changes reviewed in Git', viz: { kind: 'span', from: 'Pull request', to: 'Environment' } }],
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
      facts: [{ value: '−34%', label: 'Google Cloud cost, 2026', viz: { kind: 'compare', before: 'Before', after: '2026', ratio: 0.66 } }],
      problem:
        'A domain that scales to hundreds of nodes per service can spend a lot on Google Cloud, and the bill needs an owner.',
      approach:
        "I took on governance for the domain's infrastructure. Because everything is defined in Terraform and deployed through Argo CD, a cost change goes through the same pull request flow as any other change, so it is reviewed, rolled out gradually and can be reverted.",
      outcome: 'Google Cloud costs for the domain fell by 34% in 2026.',
      chips: ['FinOps', 'Governance', 'GCP'],
    },
    {
      where: 'Olinqua, Head of DevOps and Cloud Engineering (contract), Jan 2023 - Jun 2026',
      title: 'Delivery and Azure foundations for healthcare products',
      facts: [{ value: '3+', label: 'years leading DevOps and cloud engineering' }],
      problem:
        'Healthcare products had no automated builds or deployments, and the Azure virtual machine estate was set up by hand for every new partner and customer.',
      approach:
        'I built CI/CD pipelines for the products, introduced Octopus Deploy for releases, and moved provisioning for new partners and customers to infrastructure as code, reviewed like application code. I also designed an Azure Landing Zones architecture as the standard foundation for networking, identity, governance and security.',
      outcome:
        'New partners and customers come from repeatable, reviewed code instead of manual setup. Azure costs fell after optimizing the virtual machine infrastructure, and most day-to-day operations are automated.',
      chips: ['Azure', 'Landing Zones', 'Octopus Deploy', 'Infrastructure as code', 'CI/CD'],
    },
  ] satisfies Case[],
};

export const flow = {
  label:
    'Generic platform flow: a pull request in Git is applied by Terraform and Terragrunt to Google Cloud, and by Argo CD with Helm to the GKE clusters.',
  title: 'How a change reaches production',
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
  label: '2015 - 2023',
  items: [
    {
      kicker: 'Cloud Engineering and DevOps Lead (contract), DXC healthcare software business, later Dedalus, 2021 - 2023',
      title: 'One delivery standard for healthcare teams',
      text: 'Hired to standardize how several healthcare product teams build, test, release and monitor software as the business moved to SaaS. Introduced CI/CD, made GitLab the shared source control and brought Docker to OpenShift. After Dedalus took over the business, I assessed teams with very different setups and led a consolidation plan for shared CI/CD, containers and infrastructure as code.',
    },
    {
      kicker: 'DevOps Engineer, later Senior DevOps Engineer, Mobi / BSM Technologies, 2017 - 2019',
      title: '44 microservices, containerized',
      text: 'Right after joining, I took 44 microservices that were deployed as plain Node.js processes and containerized them. They moved to Docker Swarm, then to more than 16 multi-AZ clusters.',
    },
    {
      kicker: 'DevOps Engineer, later Senior DevOps Engineer, Mobi / BSM Technologies, 2017 - 2019',
      title: 'Weeks to hours',
      text: 'Rebuilt the delivery pipeline in under 8 months around Octopus Deploy. The result was one-click deployments to any environment, with approvals and releases in the business\'s hands. Release lead time dropped from weeks to hours.',
    },
    {
      kicker: 'Automation Engineering Manager, earlier Release Manager and QA Team Leader, Autobytel / Autoweb, 2015 - 2017',
      title: 'Led a 12-person release team',
      text: "Managed developers and system administrators who automated releases to every environment with Jenkins, Ansible, Chef, Docker and Terraform on AWS, and owned the branching model and delivery standards. Before that I started the company's DevOps transformation with a team of about 10, introducing CI/CD, infrastructure as code and its first automated test suites.",
    },
  ] satisfies Item[],
};

export const teaching = {
  heading: 'Teaching and community',
  label: '2018 - 2024',
  items: [
    {
      kicker: 'Universidad Francisco Marroquín, 2018 - 2020',
      title: 'Computer science instructor',
      text: 'Taught computer science to undergraduates in Guatemala City.',
    },
    {
      kicker: 'Docker Guatemala',
      title: 'Community lead',
      text: 'Led the local Docker community and received an honorable mention for community leadership at DockerCon 2020.',
    },
    {
      kicker: 'kontinu.io, 2020 - 2024',
      title: 'Bootcamps for banks and IT firms',
      text: "Founded a consultancy that ran cloud-native, DevOps and Extreme Programming bootcamps for two of Guatemala's largest banks and a global customer-experience and IT services company, including sessions that taught HR and recruiting teams how engineering roles work.",
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
