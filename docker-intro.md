# Docker Introduction

## How does Docker differ from a virtual machine?

Docker and virtual machines both provide isolated environments for running applications, but they work differently.

A virtual machine creates a complete virtual computer. It normally has its own operating system, virtual hardware, memory, and other resources. Because of this, virtual machines can require more resources and take longer to start.

Docker containers are more lightweight. Instead of running a complete operating system for every application, containers share the host operating system kernel while keeping the application and its dependencies isolated. This generally makes containers faster to start and less resource-heavy compared to virtual machines.

From a development point of view, I think the main difference is that a VM is closer to creating another computer inside my computer, while Docker is more like creating an isolated environment specifically for the application I want to run.

## Why is containerization useful for a backend like Focus Bear's?

Containerization is useful for a backend because backend applications usually depend on several things besides the application code itself. For example, they may depend on a specific Node.js version, database, Redis, system libraries, and configuration.

With Docker, these services can be defined and run in a predictable environment. This reduces situations where the application works on one developer's machine but fails on another machine because their environments are different.

This is especially relevant to Focus Bear because its backend development setup uses Docker Compose to manage services such as the NestJS API, PostgreSQL, and Redis. The onboarding documentation also mentions that the backend runs inside Docker containers so that the development environment can more closely match production.

For me as a developer, this makes setting up the project easier because I do not have to manually configure every service directly on my computer. I can use the Docker configuration provided by the project and run the required services in containers.

## How do containers help with dependency management?

Containers help with dependency management because the application's runtime and required dependencies can be defined as part of the Docker image.

For example, if a backend requires a certain version of Node.js, the Dockerfile can specify that version. Other developers building the same image will then use the same runtime instead of depending on whatever Node.js version happens to be installed on their computer.

The same idea applies to supporting services. Instead of asking every developer to manually install the correct PostgreSQL version, the project can define the required PostgreSQL image in Docker Compose. Focus Bear's onboarding setup uses this approach for PostgreSQL, which allows the database to run consistently without requiring PostgreSQL to be installed directly on the developer's machine.

I think this makes onboarding and debugging easier because there are fewer differences between each developer's environment.

## What are the potential downsides of using Docker?

Although Docker makes development more consistent, it also adds another layer that developers need to understand.

One downside is the learning curve. At first, concepts such as images, containers, volumes, networks, Dockerfiles, and Docker Compose can be confusing. When something goes wrong, I also need to determine whether the problem comes from the application itself or from the container configuration.

Docker can also consume a noticeable amount of CPU, memory, and disk space, especially when several containers and images are running or stored locally. On macOS and Windows, Docker Desktop also uses virtualization underneath because Linux containers need a Linux environment.

Debugging can sometimes be less straightforward as well. For example, files, ports, environment variables, databases, and network connections exist inside or between containers, so I cannot always debug them in exactly the same way as an application running directly on my machine.

Overall, I think these disadvantages are manageable. For a backend with multiple services like Focus Bear's, the consistency and easier setup provided by Docker seem more valuable than the additional complexity it introduces.

## Conclusion

After learning more about Docker, I understand why it is commonly used for backend development. The biggest advantage for me is consistency. Instead of every developer manually recreating the same development environment, Docker describes the environment and allows the team to reproduce it.

For Focus Bear, this is particularly useful because the backend involves multiple services such as NestJS, PostgreSQL, and Redis. Docker and Docker Compose provide a practical way to run these services together while keeping the local development setup closer to the production environment.
