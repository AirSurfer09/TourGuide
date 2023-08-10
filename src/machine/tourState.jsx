import { createMachine } from "xstate";
import { after } from "xstate/lib/actions";

export const tour = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOgOoEMBLAF0IDsoBiAZWQEEAlZAbQAYBdRUAB1VhMKoyXEAA9EAFgBMAdmwBmVgFYVARilKAnKqUAOCUoA0IAJ6IlANgnYLFqfJmX5m+XYC+b42ix4wAGwBjVABbMDx8Pz8ABSIyUgpKAj8Aa1g2TiQQXn5SIRFxBD1NbCVXZ3ldVQddXWMzBFkLbFVWCxlVHRkLXTtWCQ8vDBxcfyDQ8JTyKGpifGIwSgYwfACAC0h0kWyBPMyCmV1ipRlNXVKNFxl5CTrJCWKJCVZWM4tnqU1NCwGQb2GI6KxeJQbAMVCzeaUAAiQjAm0y21ywj2iHUUlUJSquikrHRVlUmhupnMEl02AMTykPUUjlUPz+E0B5GB2AAoqISNDYfCeHwdsjQAUqk8FFILHoLJdSvJbghbMULvcLA5VLoZFd6UNsHQyCYAIroOBI2CUUSwCFhfAAM3mmAAFC1nqwAJSUBk6-WG82CMhpDhbPlI-KIAC0qgk8mwfQkqpkT1O2jFsrDqjkFlTOPuLw0bV0mp8AGEhBB+ZQAJpwHlZQM+4MNViRj5KdRY1iqdNnWXXYpxlTqmQNlqp+T5nBFsglpGUAByqCriNrKIQqtY2Ez2nDBKkUgjRmJ9dXMjFKlKdnUrA1nl+WpGgRCYVvYzAAHFMGAwMCuWQ4f6ETXdoK5iHCUZQuJU1S1Pu6JpqmVSKPIijHLYo6+He4zstwfixDMcxel+YBSPO-4CmIiAHEcJxnPIFwONcXaaKumhKMoF7KFYTF9B4V5kKgEBwCIfwBjki6AQgYbaFGjyxvGhzqBYybbtY6KPKUeiOH0ugjleDIEAIFBCfydYnEoNgVPoshfAxlSygOcgdEoOIIQx1GuChj73gZQZLvIxwlC8ypVG2LEyvuZLmdiyiWO2XR5tpN6jPeqFPq+77Ap5ImkQgTwmcx1KBS0zEhfUXwKIothWNGzzHG5CXjEkTJxFM6UAZl0g5RcXy2I4WhFYgjQlKcg72JScY1WhD4RMkUw4fMzUkQUkrFFYpLaJFPmHLK-VaLoQ3XLijhuQCMTMk1f7CS1QrKNY8jqI81RKDGmiyhIbzYJ1qYMeGtGHZEx2NRQoLgnMYBzXWHS4got0RgcD0ErKD1koSpSklSJztv0cU+PVf0suyJCg0uVTbuShIDpoYoHKj8Okm9BjXNiaraFYKHjgEfjoHxBOiacJl2ORFRfNcrg2RezQ6KmKguG2l6DD4HoGkaPrwGdhmE8TPQ7RIcbKO0AXJlUTRHrYF7oh8LjqCzxaq7y53zaGHTWB0Jzm9l2hfJtko2BV3Tbs2jwRmNT5sqImHYRCXpc5l4qrot3RtqckodLKLRkuqzY7keR4Ie4XFAA */
  predictableActionArguments: true,
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOgOoEMBLAF0IDsoBiAZWQEEAlZAbQAYBdRUAB1VhMKoyXEAA9EAWgCMrbAHYArAA4ATAE4lCgCwBmVlIUrlAGhABPRFq1TsrNQrUrrKpXJVSAbB4C+302iw8MAAbAGNUAFswILDIsABxTDAwUgpKABEhMDZOJBBeflIhEXEEHRUdbC0HQw11I00tUwsyjyVsHQMPHQ8pJT7tOR8-EACcXBDwqLx8YOCABSIyVKoCYIBrWByRAoFivNLyyur7dVVHZW1myxdbe0dnV3dh-wxxybjsAFFRbmCl6jEfDEdBwDJZFTbPK7IrCA6IbpabBqNxqKQ6JQonRyLQqa6tdqdBTdXr9RpDXyvQJrYIAAkW5BW2AYqCBxDA4LI2Q4Oz4ezhoFKaMqSlYZ2svTkqnxVgUyLkcjsXjcck6akpozeMzm9KWTJ+fyWtOIAAswLT8El8JzubkeHzYSVJFIKtgXB51D0XVIZG18ar2qq1FYpENWIonBqxtg6GQzABFUGwWGwSiiZPA6L4ABm7MwAAoVKxi6wAJSUaOxhNJlNQ+2FQQCsSSWRSXGsaqqpx2bQVPHmRAKOTYXp6HHFvQuNSsF6awIAYSEEH5lAAmnA6-kHY2nQg1NhNHJ7LiPIpp9UlPiMfudLeh+fw-pIyNo4uyMvYZQAHKoTcwnfwnuB73r2p4OB2JgDggobDlYXh9FKjg+lKUZahMsTTGs6zkFAgKZpQDBgPgoRmhAf7bvsgoIjoSIouo6KYqqOL9i0uKBlodhKKeWhKNYCgKL4IxkKgEBwCIYy8g2lHNgg0j9G6XGer07i+peUESOoB44kePpWF6PqodSRArJJ-K7tIt4KR6aheipM5qax1jYMoHinK5jgaFohnvBhYCmY6gGaMinQqGBShHB2Hj4i4siqFKba4ueCjot5MRTNE6HpYkyQmdCFFNqU6KVDZLphRFWhRVBPTtKKXgeFoEa6AYqWZZ8NIMssOH+QBVHQdoI5SBoSi8cNJ6hjKtwuW5agebxLUfNMBr-OQeEgmJeVSQVljlPIrC3jO7hSm0TRVW0B4zl4DWGE1Akvmhsx0h1uX1mZgE4pUKg4ho06OG0XhXsoVSYp9WhojNKgQ7dVLjA9uqMjhzKspm3XSaUOlul9mJ2KFXGVY5HhVG0LrXftXE6C1sNPQjS1Gqa5qWkRKNbdB+jDreobVOiCgzlIMoVYT-RGE4pPdKlb6hME6CiUz5mDfIQ4VZ4cieNOQ4OYgQZunoDV7Z05RoqlVaJnAKYy29PHYC64UuOiqrcfifSyLoQwNToDhSo0YtLq9L0Bb1FkfYpNnKT69lXlKI7qAobsetUo7zb52rYRQq1+RtPsybo7Suaw2jRx4e38f9UGJVrFQzmK7MoYJQA */
  initial: "Waiting",
  states: {
    Waiting: {
      on: {
        START: "Welcome",
      },
    },

    Welcome: {
      states: {
        WelcomeGreeting: {
          on: {
            Done: "ExplainStatues",
          },
        },

        WallPainting: {
          on: {
            Walks: "WalkingState",
          },
        },

        WalkingState: {
          on: {
            Reached: "#Tour.WallPainting",
          },
        },

        ExplainStatues: {
          on: {
            Done2: "#Tour.AnyQuestions",
          },
        },
      },

      initial: "WelcomeGreeting",
    },

    WallPainting: {
      states: {
        Rotate: {
          on: {
            Done: "Exit",
          },
        },

        Exit: {
          on: {
            Done: "#Tour.Conclude",
          },
        },
      },

      initial: "Rotate",
    },

    Conclude: {},

    AnyQuestions: {
      after: {
        20000: {
          target: "Condition",
        },
      },
    },

    Condition: {
      on: {
        Yes: "Welcome.WallPainting",
        No: "AnyQuestions",
      },
    },
  },
  id: "Tour",
});
