# Question Bank - Legal Operations Diagnosis

This document contains the complete question library organized by section, including question types, validation rules, and branching logic.

## Section 1: Client Acquisition & Intake

### Q1.1: Lead Source Tracking
**Question**: "How do you currently track where new client inquiries come from?"
**Type**: Multiple choice (single select)
**Options**:
- We don't track lead sources
- Informal tracking (memory, notes)
- Spreadsheet or document
- CRM or practice management system
- Dedicated marketing analytics platform

**Follow-up (if "We don't track")**: "What prevents you from tracking lead sources?"

---

### Q1.2: Response Time
**Question**: "What is your typical response time from initial contact to first consultation?"
**Type**: Multiple choice (single select)
**Options**:
- Within 1 business hour
- Within 4 business hours
- Within 24 hours
- Within 2-3 days
- More than 3 days
- We don't track this

**Follow-up**: "Is this response time meeting your client expectations?"

---

### Q1.3: Conflict Check Process
**Question**: "Describe your conflict check process. How long does it typically take?"
**Type**: Composite (process description + time estimate)
**Sub-questions**:
- "What system do you use for conflict checks?" (text)
- "Average turnaround time?" (numeric: hours or days)
- "Who performs conflict checks?" (text)

---

### Q1.4: Engagement Letter Approval
**Question**: "How many people must approve an engagement letter before it's sent to the client?"
**Type**: Numeric input (0-10)
**Validation**: Must be >= 0

**Follow-up**: "How long does the approval process typically take?"

---

### Q1.5: Client Data Re-entry
**Question**: "Where is client information initially recorded, and how many times is it re-entered into different systems?"
**Type**: Composite
**Sub-questions**:
- "Initial capture location?" (text)
- "Number of times re-entered?" (numeric: 0-10)
- "Systems where data is entered?" (multi-select checklist)

---

## Section 2: Matter Management & Case Workflow

### Q2.1: File Organization
**Question**: "How do you organize case files?"
**Type**: Multiple choice (single select)
**Options**:
- Primarily physical files
- Primarily digital files
- Hybrid (both physical and digital)
- Cloud-based document management
- Practice management system

**Follow-up**: "How easy is it to find a specific document when needed?" (Likert 1-5)

---

### Q2.2: Deadline Management
**Question**: "How are deadlines tracked and communicated to responsible attorneys?"
**Type**: Multiple choice (multiple select allowed)
**Options**:
- Paper calendar
- Personal digital calendar (Outlook, Google)
- Shared team calendar
- Practice management system
- Dedicated docketing system
- Manual reminders from staff

**Follow-up**: "In the past year, have any deadlines been missed?" (Yes/No)

---

### Q2.3: Document Version Control
**Question**: "When multiple attorneys work on a document, how do you manage versions?"
**Type**: Multiple choice (single select)
**Options**:
- Email attachments with version numbers
- Shared network drive with file naming conventions
- Document management system with version control
- Cloud collaboration tools (Google Docs, Office 365)
- No formal version control

**Follow-up (if not using DMS)**: "How often do version conflicts cause rework?"

---

### Q2.4: Case Status Visibility
**Question**: "If a client asks for a case status update, how quickly can you provide it?"
**Type**: Multiple choice (single select)
**Options**:
- Immediately (real-time access)
- Within 1 hour (need to gather info)
- Within 4 hours
- Within 24 hours
- More than 24 hours

---

### Q2.5: Matter Handoff
**Question**: "What happens when a matter is transferred from one attorney to another?"
**Type**: Text (process description)
**Prompt**: "Describe the typical handoff process, including how information is transferred."

**Follow-up**: "How long does a typical handoff take?" (numeric: hours/days)

---

## Section 3: Time Tracking & Billing

### Q3.1: Time Entry Frequency
**Question**: "How frequently do attorneys record their time?"
**Type**: Multiple choice (single select)
**Options**:
- Real-time (as work is performed)
- Multiple times per day
- Once per day
- Weekly
- Bi-weekly or monthly
- Inconsistently

---

### Q3.2: Unbilled Time
**Question**: "What percentage of time worked do you estimate is never billed?"
**Type**: Numeric input (percentage: 0-100)
**Validation**: 0 <= value <= 100

**Follow-up**: "What are the main reasons time goes unbilled?" (multi-select)

---

### Q3.3: Time Entry Review
**Question**: "Who reviews time entries before they become invoices?"
**Type**: Multiple choice (multiple select)
**Options**:
- No review process
- Attorney self-review
- Partner review
- Billing coordinator review
- Client review (pre-bill)

---

### Q3.4: Write-downs
**Question**: "How often do you write down or write off time?"
**Type**: Likert scale (1-5: Never to Very Frequently)

**Follow-up**: "What are the main reasons for write-downs?" (multi-select)
- Client fee sensitivity
- Time entry errors
- Inefficient work
- Client relationship management
- Billing disputes

---

### Q3.5: Billing Cycle
**Question**: "How long does it take from month-end to invoice delivery?"
**Type**: Numeric input (days)
**Validation**: Must be > 0

**Follow-up**: "Is this timeline acceptable to you?" (Yes/No)

---

## Section 4: Document Production & Knowledge Management

### Q4.1: Template Library
**Question**: "Where are your document templates stored? Who can access them?"
**Type**: Composite
**Sub-questions**:
- "Storage location?" (multiple choice: local drives, network drive, DMS, cloud, no central location)
- "Who has access?" (multiple choice: everyone, specific roles, individual ownership)

---

### Q4.2: Precedent Search
**Question**: "How do you find previously drafted documents similar to your current need?"
**Type**: Multiple choice (single select)
**Options**:
- Full-text search in document management system
- Manual folder browsing
- Ask colleagues
- Personal file organization
- We don't reuse previous work
- Other

**Follow-up**: "How long does it typically take to find a relevant precedent?" (numeric: minutes)

---

### Q4.3: Research Duplication
**Question**: "How often do attorneys unknowingly research issues already researched by colleagues?"
**Type**: Likert scale (1-5: Never to Very Frequently)

**Follow-up**: "How is legal research shared across the firm?" (text)

---

### Q4.4: Template Customization
**Question**: "How long does it take to customize a template for a new matter?"
**Type**: Numeric input (minutes or hours)

**Follow-up**: "What slows down the customization process?" (text)

---

### Q4.5: Knowledge Sharing
**Question**: "How is legal research and expertise shared across the firm?"
**Type**: Multiple choice (multiple select)
**Options**:
- Formal knowledge management system
- Shared research database
- Internal memos or newsletters
- Informal conversations
- Email distribution
- Not systematically shared

---

## Branching Logic Examples

### Conditional Questions

**If Q1.1 = "We don't track lead sources"**
→ Skip Q1.6 (lead source ROI analysis)

**If Q2.2 includes "No formal system"**
→ Ask: "Have you experienced negative consequences from missed deadlines?"

**If Q3.2 > 20%**
→ Ask: "Have you calculated the revenue impact of unbilled time?"

**If Q4.1 storage = "No central location"**
→ Ask: "How does this affect consistency in client deliverables?"

---

## Question Design Notes

### Validation Rules
- **Numeric inputs**: Set reasonable min/max ranges
- **Percentages**: Must sum to 100% when applicable
- **Required vs. Optional**: Mark critical questions as required
- **Text length**: Limit open-text responses to 500 characters

### Response Quality
- **Avoid "Other"**: Use "Other (please specify)" with text input
- **Neutral options**: Include "Not applicable" or "Don't know" where appropriate
- **Time estimates**: Allow multiple units (minutes, hours, days)

### Accessibility
- **Clear labels**: Every input has descriptive label
- **Help text**: Provide examples or clarifications in tooltips
- **Error messages**: Specific, actionable feedback

---

*This question bank should be implemented with a flexible schema to allow easy addition, modification, or removal of questions without code changes.*
