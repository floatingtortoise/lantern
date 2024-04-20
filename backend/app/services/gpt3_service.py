import openai
import os

openai.api_key = os.environ.get('OPENAI_API_KEY')

# def ask_gpt3(prompt):
#     response = openai.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[{"role": "user", "content": prompt}],
#         n=1,                    # How many chat completion choices to generate for each input message
#         temperature=0.5,        # controls the randomness of the output
#         #@todo: cap the file size and the response size. the max of this model is 16385 tokens
#         max_tokens= 2000,        # of the generated response
#         top_p=1.0,              # also controls the randomness/variability
#         frequency_penalty=0.0,  # zero penalty for repeated words
#         presence_penalty=0.0    # similarly
#     )
#     return response.choices[0].message.content

def ask_gpt3(prompt):
    system_content = """
        Your task is to generate 5 quiz questions for young children to help them learn concepts or skills.
        You will be provided with either the specifications of the topic or the material, or both.
        When both are provided, please focus each question only on the topic, if provided.
        Regarding the materials, it only serves as a reference for the scope the questions on that topic should be limited to.
        When you generate the quiz, please take into consideration the key concepts and skills related to the topic.
        Each question has a list of 4 choices, with only the first choice being the correct answer. Each question 
        follows the format: {'question': '...', 'choices': ['...', '...', '...', '...']}
    """
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [{"role": "system", "content": system_content},
                    {"role": "user", "content": prompt}],
        n=1,                    # How many chat completion choices to generate for each input message
        temperature=0.5,        # controls the randomness of the output
        max_tokens= 2000,        # of the generated response
        top_p=1.0,              # also controls the randomness/variability
        frequency_penalty=0.0,  # zero penalty for repeated words
        presence_penalty=0.0    # similarly
    )
    return response.choices[0].message.content

def ask_gpt3_follow(prompt):
    system_content = """
        Your task is to generate one follow-up question for a child based on another question they got wrong.
        You will be provided with the relevant topics or materials the child is studying, as well as other questions
        you have already asked.
        In generating the follow-up question, please stick to the scope of those topics and materials.
        Meanwhile, please consider the possible reasons why they got it wrong. 
        Try to generate a question that can invoke reflections on the previous question, and avoid generating 
        a question that they most likely will also get wrong due to certain lack of information you identified 
        from their previous answer.
        The question has a list of 4 choices, with only the first choice being the correct answer. 
        Your response should follow the format: {'question': '...', 'choices': ['...', '...', '...', '...']}
    """
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [{"role": "system", "content": system_content},
                    {"role": "user", "content": prompt}],
        n=1,                    # How many chat completion choices to generate for each input message
        temperature=0.5,        # controls the randomness of the output
        max_tokens= 2000,        # of the generated response
        top_p=1.0,              # also controls the randomness/variability
        frequency_penalty=0.0,  # zero penalty for repeated words
        presence_penalty=0.0    # similarly
    )
    return response.choices[0].message.content