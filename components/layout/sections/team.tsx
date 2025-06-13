import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}
export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["Vue Fronted Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "Github",
          url: "https://github.com/en20",
        },
        {
          name: "X",
          url: "https://x.com/RENZOPOIU",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["UI/UX Designer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "X",
          url: "https://x.com/RENZOPOIU",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["Machine Learning Engineer", "TensorFlow Tinkerer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "Github",
          url: "https://github.com/en20",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["Cloud Native Developer", " Kubernetes Orchestrator"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "Github",
          url: "https://github.com/en20",
        },
        {
          name: "X",
          url: "https://x.com/RENZOPOIU",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["DevOps Engineer", "CI/CD Pipeline Mastermind"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["JavaScript Evangelist", "Deno Champion"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "Github",
          url: "https://github.com/en20",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["Backend Developer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/enzo-lozano-abreu/",
        },
        {
          name: "Github",
          url: "https://github.com/en20",
        },
        {
          name: "X",
          url: "https://x.com/RENZOPOIU",
        },
      ],
    },
    {
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHrvaez9SOXZQ/profile-displayphoto-shrink_800_800/B4EZNt8e0MGYAw-/0/1732716394115?e=1746662400&v=beta&t=ZEgJytfY5szj1muFBK9o5iSooyI434NXcVrr-4TWcOQ",
      firstName: "Enzo",
      lastName: "Lozano",
      positions: ["Fullstack Developer", "UX Researcher"],
      socialNetworks: [
        {
          name: "X",
          url: "https://x.com/RENZOPOIU",
        },
      ],
    },
  ];
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Team
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          The Company Dream Team
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index
          ) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="py-6 pb-4 px-6">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${
                    index === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="space-x-4 mt-auto">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="hover:opacity-80 transition-all"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
