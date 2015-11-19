import JobItem from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const job = {
  key: "5a6e",
  title: "Agile Team Coach / PM",
  full_title: "Agile Team Coach / PM - London",
  code: "",
  shortcode: "58E3D60B6A",
  state: "published",
  department: "",
  url: "https://ustwo.workable.com/jobs/21916",
  application_url: "https://ustwo.workable.com/jobs/21916/candidates/new",
  shortlink: "https://ustwo.workable.com/j/58E3D60B6A",
  location: {
    country: "United Kingdom",
    country_code: "GB",
    region: "London, City of",
    region_code: "LND",
    city: "London",
    zip_code: "E1 6JJ",
    telecommuting: ""
  },
  created_at: "2014-10-08"
};

const jobDetail = {
  application_url: "https://ustwo.workable.com/jobs/21916/candidates/new",
  benefits: "Above all we are a people centred company that strives to create the best opportunities for the best people in the industry. And we just so happen to have an amazing studio space and great tools for learning and sharing.We offer a competitive package, including but not limited to, a company wide profit sharing platform, company pension, life assurance, private medical, training budget and amazing family policies.25 days holiday, inclusive of studio closure days over Christmas.We also promote flexible working days.Sounds good? Then please apply : )",
  code: "",
  created_at: "2014-10-08",
  department: "",
  description: "We’re a small and tight-knit community of Coaches at ustwo and we’re looking for a passionate Lean and Agile advocate to join us.As part of our Coach Team your role will be incredibly varied, but central will be the responsibility for the development and continuous improvement of our delivery processes. You will also have a strong focus on team dynamics and enabling individuals to grow both personally and professionally.So, if you're well versed with Agile and Lean approaches, delight in building cohesive teams and want to be part of a collaborative and dynamic culture that puts people in the centre, then we'd love to hear from you.",
  education: "Unspecified",
  employment_type: "Full-time",
  experience: "Mid-Senior level",
  full_description: "We’re a small and tight-knit community of Coaches at ustwo and we’re looking for a passionate Lean and Agile advocate to join us.As part of our Coach Team your role will be incredibly varied, but central will be the responsibility for the development and continuous improvement of our delivery processes. You will also have a strong focus on team dynamics and enabling individuals to grow both personally and professionally.So, if you're well versed with Agile and Lean approaches, delight in building cohesive teams and want to be part of a collaborative and dynamic culture that puts people in the centre, then we'd love to hear from you. RequirementsAgile Product Delivery - You’ve supported full product delivery cycles, from discovery to handover, and can demonstrate that a variety of Agile tools and practices have been central to the delivery of high quality products. Team Dynamics - You understand the characteristics of high performing teams and have a wide variety of tools available to you to help drive / guide a team towards greater dynamics, collaboration and effectiveness. Stakeholder Relationships - You’re able to cultivate and grow meaningful relationships with clients and external stakeholders, encourage engagement and alignment of expectations, help them influence and drive change within their own organisation and empathise with the challenges they are facing.Continuous Improvement - You’re continuously looking for ways to improve delivery processes and eager to learn more about better ways of building teams and products.Encouraging Growth - You recognise that it’s often the unsaid that holds us back, so you champion a culture of encouraging constructive feedback - both by providing individual feedback and coaching to team members and requesting it for your own development.Commercial Acumen - You have a strong understanding of the commercial aspect of building a product and feel comfortable managing budgets and optimising return on investment, as well as working with the commercial team to develop contracts, budgets and Scope of Work documents.Role-Modeling - You role-model the principles and values that you stand for and look to foster the same within your teams.BenefitsAbove all we are a people centred company that strives to create the best opportunities for the best people in the industry. And we just so happen to have an amazing studio space and great tools for learning and sharing.We offer a competitive package, including but not limited to, a company wide profit sharing platform, company pension, life assurance, private medical, training budget and amazing family policies.25 days holiday, inclusive of studio closure days over Christmas.We also promote flexible working days.Sounds good? Then please apply : )",
  full_title: "Agile Team Coach / PM - London",
  function: "Project Management",
  industry: "Design",
  key: "5a6e",
  location: {
    city: "London",
    country: "United Kingdom",
    country_code: "GB",
    region: "London, City of",
    region_code: "LND",
    telecommuting: "",
    zip_code: "E1 6JJ"
  },
  requirements: "Agile Product Delivery - You’ve supported full product delivery cycles, from discovery to handover, and can demonstrate that a variety of Agile tools and practices have been central to the delivery of high quality products. Team Dynamics - You understand the characteristics of high performing teams and have a wide variety of tools available to you to help drive / guide a team towards greater dynamics, collaboration and effectiveness. Stakeholder Relationships - You’re able to cultivate and grow meaningful relationships with clients and external stakeholders, encourage engagement and alignment of expectations, help them influence and drive change within their own organisation and empathise with the challenges they are facing.Continuous Improvement - You’re continuously looking for ways to improve delivery processes and eager to learn more about better ways of building teams and products.Encouraging Growth - You recognise that it’s often the unsaid that holds us back, so you champion a culture of encouraging constructive feedback - both by providing individual feedback and coaching to team members and requesting it for your own development.Commercial Acumen - You have a strong understanding of the commercial aspect of building a product and feel comfortable managing budgets and optimising return on investment, as well as working with the commercial team to develop contracts, budgets and Scope of Work documents.Role-Modeling - You role-model the principles and values that you stand for and look to foster the same within your teams.",
  shortcode: "58E3D60B6A",
  shortlink: "https://ustwo.workable.com/j/58E3D60B6A",
  state: "published",
  title: "Agile Team Coach / PM",
  url: "https://ustwo.workable.com/jobs/21916",
};

const Sandbox = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },
  render() {
    return <div className="sandbox full-width-component">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      {renderVariations({
        'Collapsed': <JobItem job={job} />,
        'Loading': <JobItem job={job} open={this.state.open} />,
        'Expanded': <JobItem job={jobDetail} open={this.state.open} />,
        'With colour': <JobItem job={job} colour="#143fcc" />
      })}
    </div>;
  },
  componentDidMount() {
    this.setState({
      open: true
    });
  }
});

export default Sandbox;
