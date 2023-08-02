import { createMachine } from 'xstate';
import { after } from 'xstate/lib/actions';

export const tour = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOgOoEMBLAF0IDsoBiAZWQEEAlZAbQAYBdRUAB1VhMKoyXEAA9EARgCsATmwB2eawAcygMwAmGawAsKnVIA0IAJ6IdANg3YdelVIutWWmVJ0Bfd8bRY8YADYAxqgAtmB+QaFgAOKYYGCkFJQAIkJgbJxIILz8pEIi4gg6ylLYUvLKEjoSyo4WVjLGZghq2tiurFKsSg46rhIWnt4YOLgBwWF4+P7+AApEZIlUBP4A1rAZIjkC+VmFxaXlldW1rPVaTeZ9NnYljs4yrh5eID6j41HYAKKi3P4L1GI+GI6DgKTSGk2WW2eWEe0QFTk5RkJU0sjU8jUOkuLTaHS6PQsfS6z2GvjGkUmK1W5CggOBYEoDDA+ECAAtIFCeHwdnDQIVEWV5CipGiZBisTjbHJbE47k4XIMXm8pjN5uQltgGKggcRGakyOkOFsebCCpIzqUVJoURYKq01EZTOZ6tg7RYJDIDFo1HaqkNXiNVXMFpqfiRwYaudlTYI+WJEF0yhYOhYSl6VLocfIpMpsFVlNUNGplDnnGoAyq6GQTABFUGwWGwSiiRsM7D4ABmeswAAoNE4nABKShVmv1uBN6MwuPmhASJTYAd9CRVT0aDQ6R04yo2UuFjTyCyis7yCSVoMAYSEEF5lAAmnBp7HdvzJMpWEvdDJV9UZButydZpqgkdo7VqRQdA0AYoIrZUrxvO8ADlUGfXJZ3hecPy-Fc13-Tdt2dBAB0-eQNGPKRRSsCQB0xTwXjIVAIDgEQ3hNdDXwTBAAFp5BsNRvzUKpOh-GQLDUHFuIsbBBycKp-ykTdLBKC9ySIJZ2N5Oc9GTVN0z0D9sSIyxrHFYTFPKSwpFU95KTATSzUwjRRTKLoS1zBxFE0CSiIEtQbCsO0zKEsj5BsiIJnCClItieINOhF940KATQMo1h3LuLzixxVpQNsGpyLPX06nC6LPhWEMNVpByMLfFpoOTSCdDPWwsR84DrjMvQLPkSw+lKj5Jh+P4AV1Bsas4wpZGsFQSgOLFV19HKfxuAq-WKs4Brs1UaQoek9QmpLE1cN1anEn9nGLVopU6oTuuc3rj1K6ZKsWaqEo4o6EGUGQ+NUdcAMxcUNBy4V81UYqKkcWwiWetVQ1pLUdQZQ65y9Up-vwzcgc0KU7XzO0pDXWpRQeuHXrDUQSFRzDV1dM4TkULQPw0ZQ8b4gYc2J480TC+DfGvMhAn8dBmJpuqRTdQ8fpLMS2osbNunzaQF0o8VWAXOCyRwas6wbJtxa4n6+Moyjmu6s9xJxdcCeLWbnHEmplHCwXb0c7lPu0z8HD02QDKzYyNbKCD-yPNQMVqZ5PCAA */
  predictableActionArguments: true,
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOgOoEMBLAF0IDsoBiAZWQEEAlZAbQAYBdRUAB1VhMKoyXEAA9EAWgCMrbAHYArAA4ATAE4lCgCwBmVlIUrlAGhABPRFq1TsrNQrUrrKpXJVSAbB4C+302iw8MAAbAGNUAFswILDIsABxTDAwUgpKABEhMDZOJBBeflIhEXEEHRUdbC0HQw11I00tUwsyjyVsHQMPHQ8pJT7tOR8-EACcXBDwqLx8YOCABSIyVKoCYIBrWByRAoFivNLyyur7dVVHZW1myxdbe0dnV3dh-wxxybjsAFFRbmCl6jEfDEdBwDJZFTbPK7IrCA6IbpabBqNxqKQ6JQonRyLQqa6tdqdBTdXr9RpDXyvQJrYIAAkW5BW2AYqCBxDA4LI2Q4Oz4ezhoFKaMqSlYZ2svTkqnxVgUyLkcjsXjcck6akpozeMzm9KWTJ+fyWtOIAAswLT8El8JzubkeHzYSVJFIKtgXB51D0XVIZG18ar2qq1FYpENWIonBqxtg6GQzABFUGwWGwSiiZPA6L4ABm7MwAAoVKxi6wAJSUaOxhNJlNQ+2FQQCsSSWRSXGsaqqpx2bQVPHmRAKOTYXp6HHFvQuNSsF6awIAYSEEH5lAAmnA6-kHY2nQg1NhNHJ7LiPIpp9UlPiMfudLeh+fw-pIyNo4uyMvYZQAHKoTcwnfwnuB73r2p4OB2JgDggobDlYXh9FKjg+lKUZahMsTTGs6zkFAgKZpQDBgPgoRmhAf7bvsgoIjoSIouo6KYqqOL9i0uKBlodhKKeWhKNYCgKL4IxkKgEBwCIYy8g2lHNgg0j9G6XGer07i+peUESOoB44kePpWF6PqodSRArJJ-K7tIt4KR6aheipM5qax1jYMoHinK5jgaFohnvBhYCmY6gGaMinQqGBShHB2Hj4i4siqFKba4ueCjot5MRTNE6HpYkyQmdCFFNqU6KVDZLphRFWhRVBPTtKKXgeFoEa6AYqWZZ8NIMssOH+QBVHQdoI5SBoSi8cNJ6hjKtwuW5agebxLUfNMBr-OQeEgmJeVSQVljlPIrC3jO7hSm0TRVW0B4zl4DWGE1Akvmhsx0h1uX1mZgE4pUKg4ho06OG0XhXsoVSYp9WhojNKgQ7dVLjA9uqMjhzKspm3XSaUOlul9mJ2KFXGVY5HhVG0LrXftXE6C1sNPQjS1Gqa5qWkRKNbdB+jDreobVOiCgzlIMoVYT-RGE4pPdKlb6hME6CiUz5mDfIQ4VZ4cieNOQ4OYgQZunoDV7Z05RoqlVaJnAKYy29PHYC64UuOiqrcfifSyLoQwNToDhSo0YtLq9L0Bb1FkfYpNnKT69lXlKI7qAobsetUo7zb52rYRQq1+RtPsybo7Suaw2jRx4e38f9UGJVrFQzmK7MoYJQA */
  initial: 'Waiting',
  states: {
    Waiting: {
      on: {
        START: 'Welcome',
      },
    },

    Welcome: {
      states: {
        WelcomeGreeting: {
          on: {
            Done: 'ExplainStatues',
          },
        },

        WallPainting: {
          on: {
            Walks: 'WalkingState',
          },
        },

        ExplainStatues: {
          on: {
            Done2: '#Tour.AnyQuestions',
          },
        },

        WalkingState: {
          on: {
            Reached: "#Tour.WallPainting",
          },
        },
      },

      initial: 'WelcomeGreeting',
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
            Done: '#Tour.Conclude'
          },
        },
      },

      initial: 'Rotate',
    },

    Conclude: {},

    AnyQuestions: {
      after: {
        20000: {
          target: 'Condition',
        },
      },
    },

    Condition: {
      on: {
        Yes: 'Welcome.WallPainting',
        No: 'AnyQuestions',
      },
    },
  },
  id: 'Tour',
});
