---
id: Computer Science Dictionary
title: Computer Science Dictionary
sidebar_label: Computer Science Dictionary
---

### Verilog

Verilog is a hardware description language (HDL) used primarily for modeling, simulating, and synthesizing digital circuits and systems. It allows engineers to describe electronic systems at various levels of abstraction, from high-level behavioral descriptions to detailed gate-level implementations. Verilog is widely used in the semiconductor industry for designing application-specific integrated circuits (ASICs), field-programmable gate arrays (FPGAs), and other digital hardware. It supports both concurrent and sequential execution models, reflecting the parallel nature of hardware operations. Along with VHDL, Verilog is one of the two major HDLs used in electronic design automation (EDA) workflows for digital circuit design, verification, and implementation.

### P (Polynomial Time)

P is the complexity class of decision problems that can be solved by a deterministic Turing machine in polynomial time. In simpler terms, these are problems for which efficient algorithms exist that can find a solution in a reasonable amount of time, even as the input size grows. The time required to solve these problems grows as a polynomial function of the input size. Examples include sorting algorithms, searching in ordered lists, and determining if a number is prime using modern primality tests. P represents the class of problems that are considered computationally tractable.

### NP (Nondeterministic Polynomial Time)

NP is the complexity class of decision problems for which a solution can be verified in polynomial time, even if finding that solution might take longer. More formally, these are problems solvable by a nondeterministic Turing machine in polynomial time. Every problem in P is also in NP (since if you can solve a problem quickly, you can certainly verify a solution quickly), but the famous open question in computer science is whether P = NP, which asks if every problem whose solution can be quickly verified can also be quickly solved. Examples of NP problems include the Boolean satisfiability problem, the traveling salesman decision problem, and the subset sum problem.

### NP-Complete

NP-Complete problems are the hardest problems in the NP class, in the sense that if an efficient (polynomial time) algorithm exists for any NP-Complete problem, then efficient algorithms would exist for all problems in NP. A problem is NP-Complete if it is in NP and every other problem in NP can be reduced to it in polynomial time. The first problem proven to be NP-Complete was the Boolean satisfiability problem (SAT), through Cook's theorem. Other examples include the traveling salesman decision problem, the graph coloring problem, and the subset sum problem. The P vs NP question essentially asks whether NP-Complete problems can be solved efficiently.

### NP-Hard

NP-Hard problems are at least as hard as the hardest problems in NP, but they might not be in NP themselves. A problem is NP-Hard if every problem in NP can be reduced to it in polynomial time, but the problem itself might not be verifiable in polynomial time. NP-Hard problems can be decision problems, search problems, or optimization problems. All NP-Complete problems are NP-Hard, but not all NP-Hard problems are NP-Complete. Examples of NP-Hard problems include the traveling salesman optimization problem (finding the shortest route), the graph isomorphism problem, and the halting problem. Many important optimization problems in various fields like operations research, bioinformatics, and artificial intelligence are NP-Hard, which is why approximation algorithms and heuristics are often used to find good-enough solutions in practice.

### SHA-256 Checksum

SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that generates a fixed-size 256-bit (32-byte) hash value, typically rendered as a 64-character hexadecimal string. It belongs to the SHA-2 family of hash functions, designed by the National Security Agency (NSA). SHA-256 is widely used for data integrity verification through checksums, which allow users to verify that a file or message hasn't been altered during transmission or storage. It possesses several critical properties: it's deterministic (the same input always produces the same output), fast to compute, designed to be collision-resistant (extremely difficult to find two different inputs that produce the same hash), and exhibits the avalanche effect (a small change in input drastically changes the output). SHA-256 is extensively used in digital signatures, blockchain technology (particularly Bitcoin), password storage, SSL/TLS certificates, and file verification systems. Unlike encryption, SHA-256 is a one-way function, meaning it's computationally infeasible to reverse the process and derive the original input from the hash value.

### TCP (Transmission Control Protocol)

TCP is a connection-oriented protocol that operates at the transport layer of the Internet Protocol Suite. It provides reliable, ordered, and error-checked delivery of data between applications running on hosts communicating over an IP network. TCP establishes a full-duplex communication channel between sender and receiver through a process called a three-way handshake (SYN, SYN-ACK, ACK) before any data exchange begins. It implements flow control through a sliding window mechanism, congestion control to prevent network overload, and retransmission of lost packets to ensure data integrity. TCP segments data into packets, assigns sequence numbers for proper ordering, and requires acknowledgment of received packets. Due to these reliability features, TCP is used for applications where accurate data delivery is critical, such as web browsing (HTTP/HTTPS), email (SMTP), file transfers (FTP), and remote administration (SSH). The trade-off for this reliability is increased latency and overhead compared to connectionless protocols like UDP.

### UDP (User Datagram Protocol)

UDP is a connectionless transport layer protocol in the Internet Protocol Suite that operates with minimal overhead and no guaranteed delivery. Unlike TCP, UDP does not establish a connection before sending data, does not provide reliability mechanisms like acknowledgments or retransmissions, and does not guarantee that packets (called datagrams) arrive in the same order they were sent. UDP simply transmits datagrams without verifying receipt, making it significantly faster and more efficient than TCP but less reliable. The protocol includes only basic error checking through checksums but does not attempt to recover from errors. UDP is ideal for applications where speed is more important than perfect reliability, such as real-time applications that can tolerate some data loss: video streaming, voice over IP (VoIP), online gaming, DNS lookups, and IoT communications. Its low overhead makes it particularly suitable for applications that send small amounts of data or require minimal latency.

### SSH (Secure Shell)

SSH is a cryptographic network protocol that provides secure communication over an unsecured network by establishing an encrypted connection between two computers. Developed as a replacement for insecure protocols like Telnet and rsh, SSH uses public-key cryptography for authentication and symmetric encryption for confidentiality and integrity of data transmission. The protocol operates primarily on TCP port 22 and supports multiple authentication methods, including password-based authentication, public key authentication, host-based authentication, and keyboard-interactive authentication. SSH enables several secure network services: remote command-line login, remote command execution, secure file transfer (via SFTP or SCP), port forwarding (tunneling), and X11 forwarding for running graphical applications remotely. It's widely used by system administrators for secure remote server management, by developers for secure access to version control systems, and as a fundamental component in automated deployment pipelines. SSH's architecture consists of three major components: the transport layer protocol (providing encryption and server authentication), the user authentication protocol, and the connection protocol (multiplexing the encrypted tunnel into multiple logical channels). Modern implementations like OpenSSH have become the de facto standard for secure remote access across Unix-like operating systems, Windows, and network devices.

### Float (Floating-Point Number)

A float, or floating-point number, is a data type used in computer programming to represent real numbers that can have a fractional part. Unlike integers, which represent whole numbers, floats can represent a wide range of values, including very small and very large numbers, as well as numbers with decimal points. Floating-point numbers are typically stored in a format defined by the IEEE 754 standard, which specifies how to represent the number using a sign bit, an exponent, and a significand (or mantissa). Common floating-point types include single-precision (usually 32-bit) and double-precision (usually 64-bit), offering different ranges and levels of precision. While versatile, floating-point arithmetic can introduce small inaccuracies due to the finite way real numbers are approximated, leading to potential rounding errors or loss of precision in calculations.

**Reference:** [How floating point works - jan Misali](https://www.youtube.com/watch?v=dQhj5RGtag0&ab_channel=janMisali)

### Floating-Point Precision

Floating-point precision refers to the number of significant digits that can be accurately represented by a floating-point data type. It determines how close the stored floating-point number can be to the true mathematical value. Precision is limited because computers store numbers in a finite number of bits. The IEEE 754 standard defines common formats like single-precision (float) and double-precision (double). Single-precision typically offers about 7 decimal digits of precision, while double-precision offers about 15-17 decimal digits. 

What this means in practice is that calculations involving floating-point numbers may not always be exact. For example, representing 0.1 in binary floating-point is not perfectly accurate, similar to how 1/3 cannot be perfectly represented as a finite decimal. This can lead to:
- **Rounding Errors**: Small discrepancies that occur when a number is rounded to fit the available precision.
- **Loss of Significance**: When subtracting two nearly equal numbers, significant digits can be lost, leading to a result with much lower relative accuracy.
- **Comparison Issues**: Directly comparing two floating-point numbers for equality (e.g., `a == b`) can be unreliable due to these small precision differences. It's often better to check if their absolute difference is within a small tolerance (epsilon).

Understanding floating-point precision is crucial in scientific computing, financial calculations, and any domain where numerical accuracy is important, as ignoring these limitations can lead to incorrect results or unexpected behavior in programs.

**Reference:** [How floating point works - jan Misali](https://www.youtube.com/watch?v=dQhj5RGtag0&ab_channel=janMisali)

