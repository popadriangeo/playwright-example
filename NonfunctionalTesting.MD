# A Profile of Non Functional testing

While in the previous article, we delved into some functional testing types(Unit, Integration, and Regression Testing),
in this one, we will talk about Non Functional testing and some of the tools we use to achieve its implementation.

## What is the scope of non-functional testing?

Non-Functional testing is performed to assess and verify the non-functional requirements of the system under test.
The application's security, performance, portability, and usability, alongside other non-functional characteristics, should be scrutinized to meet the business expectations associated with the software product.

## Security Testing
I've chosen to start with Security testing because more often than not, it's overlooked during the development process.
There are a lot of resources allocated towards a software project, front-end and back-end developers, QA, Dev Ops, Managers, Scrum Masters, etc.
Rarely would one see the presence of a penetration tester or a security engineer.
Only when a malicious entity breaks into the system, then and only then resources are put in place for this very important process.

According to [OWASP®](https://owasp.org/), security testing can be split according to the types of vulnerability being tested:

 - Vulnerability Assessment - During this assessment, the system under test is scanned and analyzed for security issues.
 - Penetration Testing - The system under test undergoes attacks from a white-hat hacker.
 - Runtime Testing - The system undergoes analysis and security testing from an end-user.
 - Code Review - The system's code base goes under review.

One of the tools used in the Security Industry is [OWASP® Zed Attack Proxy](https://www.zaproxy.org/https://www.zaproxy.org/).
ZAP is a security tool, designed for use against web applications and its scope is detecting vulnerabilities and security risks.

## Top 10 OWASP security risks to be taken into account by the pentester or developers
 - [Broken Access Controls](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
 - [Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
 - [Code injection/Unsanitized data](https://owasp.org/Top10/A03_2021-Injection/)
 - [Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/)
 - [Security Misconfiguration](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/)
 - [Obsolete/Vulnerable Components](https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/)
 - [Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
 - [Software and Data Integrity Failures](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/)
 - [Security Logging and Monitoring Failures](https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/)
 - [Server-Side Request Forgery (SSRF)](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)

>Example - ZAP scan reveals possible security risks in Broken Access Controls.
It is estimated that ~ 94% of tested applications have some sort of Broken Access Controls, according to OWASP.
Alongside, you can see other low and medium-ranked security alerts.
![](/img/ZAP.PNG)

## Performance testing in the context of Modern Web Applications

Nowadays, when designing a modern web app, development teams can expect its system to be under heavy loads, perhaps even hundreds of thousands of concurrent users.
Performance Testing is the process that verifies that an app can support an adequate number of client-server transactions, promptly, and without impeding the user experience.
53% of mobile site visits are abandoned if pages take longer than 3 seconds to load. A further 2-second delay resulted in abandonment rates of up to 87%.

### We can break down this umbrella term - Performance Testing, into several subtypes.
 - **Load testing** determines the baseline number of users that the system supports in normal conditions. The test results can give insight into what to expect when the systems go live.
 - **Stress testing** verifies how the system performs under higher-than-expected traffic load. The test can be used to determine bottlenecks and possible breaking points where the back end fails due to the burden on the hardware resources or cloud scalability.
 - **Spike testing** simulates a sudden influx of users, well above the normal baseline arriving in a short period time. This type of test is done when expecting higher than normal traffic volumes.
 - **Endurance testing**, or **Soak testing** simulates heavy user load, spread over extended periods. The goal is to determine that the system can withstand higher-than-usual traffic without gradual deterioration of response times and other performance KPIs.

### Performance KPI's

During performance testing, we follow some Key Performance indicators. Using the information gathered from these quantifiable metrics we can determine if the test is successfull or not. In the case of test failure, the development team can identify areas of poor performance and fix or improve on them. Some of these KPIs are:

 - **Average Response times**, the most commonly used metric. The median of all response times observed for all users accessing a certain resource.
 - **Response Error Rates**, this indicates the number of times the transaction fails per 100 transactions.
 - **The Number of Concurrent users**, the number of active users in the system.
 - **Requests per second** - the number of requests per second the server is subjected to during performance testing.

>Example - This [Jmeter](https://jmeter.apache.org/) spike test report indicates 1.69 % of total request samples returned error 502/Bad Gateway.
![](/img/JmeterLog.jpg)

>We can see response times increasing during spike test execution.
![](/img/responsePercentile.jpg)