import type { FaqItem } from '@/components/FaqSection';

/** FAQ content for the educational pages, reused for on-page UI + JSON-LD. */

export const downloadFaqs: FaqItem[] = [
  {
    question: 'What is a good download speed?',
    answer:
      'For most households, 50–100 Mbps comfortably handles HD/4K streaming and general browsing on several devices. Heavy 4K streaming, large downloads, or many simultaneous users benefit from 200 Mbps or more.',
  },
  {
    question: 'Why is my download speed slower than my plan?',
    answer:
      'Wi-Fi distance and interference, older routers, background downloads, VPNs, peak-time congestion, and the device itself can all reduce measured speed. Testing over a wired connection usually gives a higher, more stable result.',
  },
  {
    question: 'Is download speed measured in MB or Mb?',
    answer:
      'Internet speed is measured in megabits per second (Mbps), while file sizes are in megabytes (MB). There are 8 bits in a byte, so a 100 Mbps connection downloads roughly 12.5 MB per second.',
  },
];

export const uploadFaqs: FaqItem[] = [
  {
    question: 'Why is my upload speed lower than download?',
    answer:
      'Most consumer broadband (cable, DSL) is asymmetric — designed to download far more than upload. Fiber connections are often symmetric, offering equal upload and download speeds.',
  },
  {
    question: 'What upload speed do I need for video calls?',
    answer:
      'A stable 3–5 Mbps upload is enough for HD video calls. Streaming to platforms or uploading large files benefits from 10 Mbps or more.',
  },
  {
    question: 'Does upload speed affect online gaming?',
    answer:
      'Gaming uses relatively little upload bandwidth, but a stable connection with low latency matters more than raw upload speed. High upload usage in the background can still cause lag.',
  },
];

export const pingFaqs: FaqItem[] = [
  {
    question: 'What is a good ping?',
    answer:
      'Under 20 ms is excellent, 20–50 ms is good, and 50–100 ms is acceptable for most uses. Above 150 ms you may notice lag in gaming and video calls.',
  },
  {
    question: 'What is the difference between ping and jitter?',
    answer:
      'Ping is the round-trip time of a single request. Jitter is how much that time varies between requests. Low ping and low jitter together mean a fast, consistent connection.',
  },
  {
    question: 'How can I lower my ping?',
    answer:
      'Use a wired Ethernet connection, choose a server geographically close to you, close bandwidth-heavy background apps, and ensure your router firmware is up to date.',
  },
];

export const guideFaqs: FaqItem[] = [
  {
    question: 'How accurate is a browser-based speed test?',
    answer:
      'Browser tests are a reliable estimate of real-world performance. Results can vary with Wi-Fi signal, device capability, browser overhead, and network congestion, so run a few tests for a representative average.',
  },
  {
    question: 'How often should I test my internet speed?',
    answer:
      'Test when you notice problems, after changing equipment or plans, or to compare different times of day. Testing at a wired connection close to your router gives the cleanest baseline.',
  },
  {
    question: 'Why do results differ between tests?',
    answer:
      'Network conditions change constantly — congestion, background app usage, and Wi-Fi interference all play a part. Averaging several tests gives the most realistic picture.',
  },
];
